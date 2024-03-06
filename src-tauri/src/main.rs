#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod commands;
pub mod plugin;
pub mod structs;
pub mod tray;

use commands::fetcher::*;
use commands::store::*;
use plugin::{init_plugins::init_plugins, plugins::create_plugins};
use serde_json::json;
use tauri::Manager;
use tauri::Wry;
use tauri_plugin_store::with_store;
use tauri_plugin_store::StoreCollection;
use tray::sys_tray::create_tray_menu;

#[tauri::command]
fn greet(name: &str) -> String {
  format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
  let sys_tray = create_tray_menu();
  let plugins = create_plugins();

  init_plugins(
    tauri::Builder::default().setup(|app| {
      if cfg!(debug_assertions) {
        app.get_window("main").unwrap().open_devtools(); // `main` is the first window from tauri.conf.json without an explicit label
      }
      Ok(())
    }),
    plugins,
  )
  .setup(|app| {
    let app_handle = app.handle();
    let mut app_data_dir = app_handle.path_resolver().app_data_dir().unwrap();
    app_data_dir.push("config.json");
    print!("{:?}", app_data_dir);

    let stores = app.state::<StoreCollection<Wry>>();

    with_store(app.app_handle(), stores, app_data_dir.clone(), |store| {
      store.insert("a".to_string(), json!("b"))
    })
    .unwrap();

    Ok(())
  })
  .system_tray(sys_tray)
  .invoke_handler(tauri::generate_handler![greet, sing, get_config])
  .run(tauri::generate_context!())
  .expect("error while running tauri application");
}
