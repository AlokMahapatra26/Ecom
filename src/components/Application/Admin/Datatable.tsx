
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import { IconButton, Tooltip } from "@mui/material"
import RecyclingIcon from "@mui/icons-material/Recycling"
import DeleteIcon from "@mui/icons-material/Delete"
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import Link from 'next/link';
import useDeleteMutation from '@/hooks/useDeleteMutation';
import ButtonLoading from '../ButtonLoading';
import { download, generateCsv, mkConfig } from "export-to-csv"
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ToggleGlobalFilterButton, // Import this
  MRT_ShowHideColumnsButton,     // Import this
  MRT_ToggleDensePaddingButton,  // Import this
  MRT_ToggleFullScreenButton,
  MRT_ColumnFiltersState,
  MRT_SortingState,    // Import this
} from 'material-react-table';


interface DatatableProps {
    queryKey: string;
    fetchUrl: string;
    columnsConfig: any[];
    initialPageSize?: number;
    exportEndpoint: string;
    deleteEndpoint: string;
    deleteType: string;
    trashView: string;
    createAction : any
}

const Datatable: React.FC<DatatableProps> = ({
    queryKey,
    fetchUrl,
    columnsConfig,
    initialPageSize = 10,
    exportEndpoint,
    deleteEndpoint,
    deleteType,
    trashView,
    createAction
}) => {


    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<MRT_SortingState>([])
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: initialPageSize
    })

    const [rowSelection, setRowSelection] = useState({})
    const [exportLoading, setExportLoading] = useState(false);


    // handle dlete 
    const deleteMutation = useDeleteMutation(queryKey, deleteEndpoint);
    const handleDelete = (ids: any, deleteType: string) => {

        let c = true;
        if (deleteType === 'PD') {
            c = confirm("Are you sure you want to delete the data permanently")
        } else {
            c = confirm("Are you sure you want to move the data into trash")
        }

        if (c) {
            deleteMutation.mutate({ ids, deleteType })
            setRowSelection({})
        }
    }


    //   export method

    const handleExport = async (selectedRows:any) => {
        setExportLoading(true);
        try{
            const csvConfig = mkConfig({
                fieldSeparator: ',',
                decimalSeparator : '.',
                useKeysAsHeaders : true,
                filename : 'csv-data'
            })

            let csv

            if(Object.keys(rowSelection).length > 0){
                // export only selected rows
                const rowData = selectedRows.map((row:any) => row.original)
                csv = generateCsv(csvConfig)(rowData)
            }else{
                // export all data
                const {data : response} = await axios.get(exportEndpoint)

                if(!response.success){
                    throw new Error(response.message)
                }

                const rowData = response.data
                csv = generateCsv(csvConfig)(rowData)
            }

            if (csv !== undefined) {
                download(csvConfig)(csv)
            }
        }catch(error){
            console.log(error)
            alert(error)
        }finally{
            setExportLoading(false);
        }
    }



    // Data fetching logic

    const {
        data: { data = [], meta } = {},
        isError,
        isRefetching,
        isLoading
    } = useQuery({
        queryKey: [queryKey, { columnFilters, globalFilter, pagination, sorting }],
        queryFn: async () => {
            const url = new URL(fetchUrl, process.env.NEXT_PUBLIC_BASE_URL)
            url.searchParams.set(
                'start',
                `${pagination.pageIndex * pagination.pageSize}`,
            );
            url.searchParams.set('size', `${pagination.pageSize}`);
            url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
            url.searchParams.set('globalFilter', globalFilter ?? '');
            url.searchParams.set('sorting', JSON.stringify(sorting ?? []));
            url.searchParams.set('deleteType' , deleteType);

            const { data: response } = await axios.get(url.href)

            return response
        },

        placeholderData: keepPreviousData
    })


    // init table
    const table = useMaterialReactTable({
        columns: columnsConfig,
        data,
        enableRowSelection: true,
        columnFilterDisplayMode: 'popover',
        paginationDisplayMode: 'pages',
        enableColumnOrdering: true,
        enableStickyHeader: true,
        enableStickyFooter: true,
        initialState: { showColumnFilters: true },
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        muiToolbarAlertBannerProps: isError
            ? {
                color: 'error',
                children: 'Error loading data',
            }
            : undefined,


        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        rowCount: meta?.totalRowCount ?? 0,
        onRowSelectionChange: setRowSelection,

        state: {
            columnFilters,
            globalFilter,
            isLoading,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isRefetching,
            sorting,
            rowSelection
        },

        getRowId: (originalRow: { _id: any; }) => originalRow._id,

        renderToolbarInternalActions: ({ table }) => (
            <>
                <MRT_ToggleGlobalFilterButton table={table} />
                <MRT_ShowHideColumnsButton table={table} />
                <MRT_ToggleFullScreenButton table={table} />
                <MRT_ToggleDensePaddingButton table={table} />

                {deleteType !== 'PD'
                    &&

                    <Tooltip title="Recycle Bin">
                        <Link href={trashView}>
                            <IconButton>
                                <RecyclingIcon />
                            </IconButton>
                        </Link>
                    </Tooltip>

                }

                {deleteType === "SD"
                    &&
                    <Tooltip title="Delete All">

                        <IconButton disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                            onClick={() => handleDelete(Object.keys(rowSelection), deleteType)}
                        >
                            <DeleteIcon />
                        </IconButton>

                    </Tooltip>
                }


                {deleteType === "PD"
                    &&
                    <>
                        <Tooltip title="Restore Data">

                            <IconButton disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                                onClick={() => handleDelete(Object.keys(rowSelection), 'RSD')}
                            >
                                <RestoreFromTrashIcon />
                            </IconButton>

                        </Tooltip>
                        <Tooltip title="Permanently Delete Data">

                            <IconButton disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                                onClick={() => handleDelete(Object.keys(rowSelection), deleteType)}
                            >
                                <DeleteForeverIcon />
                            </IconButton>

                        </Tooltip>
                    </>
                }

            </>
        ),

        enableRowActions: true,
        positionActionsColumn: 'last',
        renderRowActionMenuItems: ({ row }: any) => createAction(row, deleteType, handleDelete),

        renderTopToolbarCustomActions: ({ table }:any) => (
            <Tooltip title="export button">
                <ButtonLoading type='button' text="Export" loading={exportLoading} onClick={() => handleExport(table.getSelectedRowModel().rows)} className='cursor-pointer text-sm shadow-md p-2 '/>
            </Tooltip>
        )
    });



    return (


        <div>
            <MaterialReactTable table={table}/>
        </div>
    )
}

export default Datatable


