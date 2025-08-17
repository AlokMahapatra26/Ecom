import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const LatestOrder = () => {
  return (
    <Table>
  <TableHeader>
    <TableRow>
      <TableHead >Order Id</TableHead>
      <TableHead >Payment Id</TableHead>
      <TableHead >Total Item</TableHead>
      <TableHead >Status</TableHead>
      <TableHead >Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {Array.from({length:50}).map((_ , i) => (
         <TableRow key={i}>
      <TableCell>{`INV00${i + 1}`}</TableCell>
      <TableCell>{`PAY${i + 1}`}</TableCell>
      <TableCell>{Math.round(Math.random() * 10)}</TableCell>
      <TableCell>Pending</TableCell>
      <TableCell>{Math.round(Math.random() * 1000)}</TableCell>
    </TableRow>
    ))}
   
  </TableBody>
</Table>
  )
}

export default LatestOrder