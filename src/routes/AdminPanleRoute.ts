export const ADMIN_DASHBOARD = "/admin/dashboard"

// Media routes
export const ADMIN_MEDIA_SHOW = "/admin/media"
export const ADMIN_MEDIA_EDIT = (id:string) => id? `/admin/media/edit/${id}` : ''

// Category Routes
export const ADMIN_CATEGORY_ADD = "/admin/category/add"
export const ADMIN_CATEGORY_SHOW = "/admin/category"
export const ADMIN_CATEGORY_EDIT = (id:string) => id? `/admin/category/edit/${id}` : ''


// Product Routes
export const ADMIN_PRODUCT_ADD = "/admin/product/add"
export const ADMIN_PRODUCT_SHOW = "/admin/product"
export const ADMIN_PRODUCT_EDIT = (id:string) => id? `/admin/product/edit/${id}` : ''


// trash route
export const ADMIN_TRASH = "/admin/trash"