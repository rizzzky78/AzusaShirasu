
/* Configuration for Mongodb Atlas */

const ATLAS = {
  user: 'rizzzky',
  key: 'DEV'
}

const ATLAS_DB = {
  wabotUsers: "db_user_wabot",
  textCloud: "text_cloud",
  imageCloud: "image_cloud",
  list: {
    toDo: "to_do",
    absence: "absen",
    link: "link"
  }
}

const ATLAS_COLLECTION = {
  clientWabot: "users_wabot",
  text: "text_store",
  image: "image_store",
  _list: {
    _toDo: "to_do_list",
    _absence: "absen_list",
    _link: "link_list"
  }
}

module.exports = { ATLAS, ATLAS_DB, ATLAS_COLLECTION }