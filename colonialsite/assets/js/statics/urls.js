export const DISHES_LIST = "/api/dishes";
export const EVENTS_LIST = "/api/events";
export const MEMBERS_LIST = "/api/members";
export const MENU_CATEGORY_LIST = "/api/menus_by_date";

export const ANNOUNCEMENTS_POST = "/api/announcements/post";
export const MENU_CATEGORY_POST = "/api/menu_categories/";
export const RATING_POST = "/api/ratings/";
export const DISH_POST = "/api/dishes/";

export const DISH_PUT = (id) => ("/api/dishes/" + id + "/")
export const REMOVE_DISH_URL = (id) => ("/api/dishes/"+id+"/remove_dish_from_menu/")