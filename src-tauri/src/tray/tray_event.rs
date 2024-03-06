use log::info;
use serde::Serialize;
use tauri::{AppHandle, Manager, SystemTrayEvent};

#[derive(Clone, Serialize)]
pub struct SystemTrayPayload {
  message: String,
}

pub enum TrayState {
  NotPlaying,
  Paused,
  Playing,
}

pub fn handle_tray_event(app: &AppHandle, event: SystemTrayEvent) {
  match event {
    // https://tauri.app/v1/guides/features/system-tray/#preventing-the-app-from-closing
    SystemTrayEvent::MenuItemClick { id, .. } => {
      let main_window = app.get_window("main").unwrap();

      main_window
        .emit(
          "systemTray",
          SystemTrayPayload {
            message: id.clone(),
          },
        )
        .unwrap();

      let item_handle = app.tray_handle().get_item(&id);

      match id.as_str() {
        "quit" => {
          std::process::exit(0);
        }
        "toggle-visibility" => {
          // update menu item example
          if main_window.is_visible().unwrap() {
            main_window.hide().unwrap();
            item_handle.set_title("Show Window").unwrap();
          } else {
            main_window.show().unwrap();
            item_handle.set_title("Hide Window").unwrap();
          }
        }
        _ => {}
      }
    }
    SystemTrayEvent::LeftClick {
      position: _,
      size: _,
      ..
    } => {
      let main_window = app.get_window("main").unwrap();
      main_window
        .emit(
          "system-tray",
          SystemTrayPayload {
            message: "left-click".into(),
          },
        )
        .unwrap();
      println!("system tray received a left click");
    }
    SystemTrayEvent::RightClick {
      position: _,
      size: _,
      ..
    } => {
      println!("system tray received a right click");
    }
    SystemTrayEvent::DoubleClick {
      position: _,
      size: _,
      ..
    } => {
      println!("system tray received a double click");
    }
    _ => {}
  }
}

fn _on_quit_click(app: &AppHandle) {
  info!("============== Quit App ==============");
  app.exit(0);
}
