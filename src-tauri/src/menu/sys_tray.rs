use tauri::{CustomMenuItem, SystemTray, SystemTrayMenu, SystemTrayMenuItem, SystemTraySubmenu};

pub fn create_tray_menu() -> SystemTray {
  let tray_menu_en = SystemTrayMenu::new()
    // https://docs.rs/tauri/1.2.2/tauri/struct.SystemTraySubmenu.html
    .add_submenu(SystemTraySubmenu::new(
      "Sub Menu!",
      SystemTrayMenu::new()
        .add_item(CustomMenuItem::new(
          "bf-sep".to_string(),
          "Before Separator",
        ))
        // https://docs.rs/tauri/1.2.2/tauri/enum.SystemTrayMenuItem.html
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("af-sep".to_string(), "After Separator")),
    ))
    // https://docs.rs/tauri/1.2.2/tauri/struct.CustomMenuItem.html#
    .add_item(CustomMenuItem::new("quit".to_string(), "Quit"))
    .add_item(CustomMenuItem::new(
      "toggle-visibility".to_string(),
      "Hide Window",
    ));

  // https://docs.rs/tauri/1.2.2/tauri/struct.SystemTray.html
  SystemTray::new()
    .with_menu(tray_menu_en)
    .with_id("main-tray")
}
