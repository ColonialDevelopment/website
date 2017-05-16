export const DISHES_LIST = "/api/dishes";
export const EVENTS_LIST = "/api/events";
export const MEMBERS_LIST = "/api/members";
export const MENU_CATEGORY_LIST = "/api/menu_categories";

export const ANNOUNCEMENTS_POST = "/api/announcements/post";
export const MENU_CATEGORY_POST = MENU_CATEGORY_LIST + "/";
export const RATING_POST = "/api/ratings/";

export const REMOVE_DISH_URL = (id) => ("/api/dishes/"+id+"/remove_dish_from_menu/")