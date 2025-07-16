export const RouteIndex = '/'
export const RouteSignIn = '/sign-in'
export const RouteSignup = '/sign-up'
export const RouteProfile = '/profile'
export const RouteCategoryDetails = '/categories'
export const RouteAddCategory = '/categories/add'

export const RouteEditCategory = (category_id) => {
    if (category_id) {
        return `/category/edit/${category_id}`;
    } else {
        return `/category/edit/:category_id`; 
    }
}

export const RouteBlog = '/blog'
export const RouteBlogAdd = '/blog/add'

export const RouteBlogEdit = (blogid) => {
    if (blogid) {
        return `/blog/edit/${blogid}`
    } else {
        return `/blog/edit/:blogid`
    }
}

export const RouteBlogByCategory = (categorySlug) => {
    if (categorySlug) {
        return `/blog/category/${categorySlug}`
    } else {
        return `/blog/category/:categorySlug`
    }
}

export const RouteBlogDetails = (categorySlug, blogSlug) => {
    if (categorySlug && blogSlug) {
        return `/blog/${categorySlug}/${blogSlug}`;
    } else {
        return `/blog/:categorySlug/:blogSlug`;
    }
}

export const RouteSearch = (q) => {
    if (q) {
        return `/search?q=${q}`
    } else {
        return `/search`
    }
}

export const RouteCommentDetails = '/comments'
export const RouteUser = '/users'