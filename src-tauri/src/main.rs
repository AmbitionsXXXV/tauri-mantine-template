#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod commands;
pub mod config;
pub mod plugin;
pub mod structs;
pub mod tray;
pub mod updater;

use commands::fetcher::*;
use commands::store::*;
use config::*;
use log::info;
use once_cell::sync::OnceCell;
use plugin::{init_plugins::init_plugins, plugins::create_plugins};
use tauri::Manager;
use tray::sys_tray::create_tray_menu;
use updater::*;

pub static APP: OnceCell<tauri::AppHandle> = OnceCell::new();

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
    info!("============== Start App ==============");

    #[cfg(target_os = "macos")]
    {
      // 在 mac 上，需要请求辅助功能权限
      app.set_activation_policy(tauri::ActivationPolicy::Accessory);
      let trusted = macos_accessibility_client::accessibility::application_is_trusted_with_prompt();
      info!("MacOS Accessibility Trusted: {}", trusted);
    }

    // Global AppHandle
    APP.get_or_init(|| app.handle());

    // Init Config
    info!("Init Config Store");
    init_config(app);

    // Check Update
    // check_update(app.handle());

    Ok(())
  })
  .system_tray(sys_tray)
  .invoke_handler(tauri::generate_handler![greet, sing, get_config])
  .run(tauri::generate_context!())
  .expect("error while running tauri application");
}
