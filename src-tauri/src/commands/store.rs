use serde_json::json;
use tauri::{State, Wry};
use tauri_plugin_store::{with_store, StoreCollection};

#[tauri::command]
pub fn get_config(app_handle: tauri::AppHandle, state: State<StoreCollection<Wry>>) {
  let mut app_data_dir = app_handle.path_resolver().app_data_dir().unwrap();
  app_data_dir.push("config.json");

  with_store(app_handle, state, app_data_dir.clone(), |store| {
    store.insert("aaa".to_string(), json!("b")).unwrap();

    store.save()
  })
  .unwrap();
}
