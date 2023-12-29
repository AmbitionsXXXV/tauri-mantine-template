#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod commands;
pub mod menu;
pub mod plugin;
pub mod structs;

use commands::fetcher::sing;
use menu::sys_tray::create_tray_menu;
use plugin::{init_plugins::init_plugins, plugins::create_plugins};
use tauri::Manager;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
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
  .system_tray(sys_tray)
  .invoke_handler(tauri::generate_handler![greet, sing])
  .run(tauri::generate_context!())
  .expect("error while running tauri application");
}
