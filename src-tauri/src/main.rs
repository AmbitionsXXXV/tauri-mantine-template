#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
  format!("Hello, {}! You've been greeted from Rust!", name)
}

pub mod commands;
pub mod menu;
pub mod structs;

use commands::fetcher::sing;
use menu::sys_tray::create_tray_menu;
use tauri::Manager;

fn main() {
  let sys_tray = create_tray_menu();

  tauri::Builder::default()
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.get_window("main").unwrap().open_devtools(); // `main` is the first window from tauri.conf.json without an explicit label
      }
      Ok(())
    })
    .system_tray(sys_tray)
    .invoke_handler(tauri::generate_handler![greet, sing])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
