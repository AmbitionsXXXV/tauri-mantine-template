use tauri::api::notification::Notification;
use tauri::{plugin::TauriPlugin, Wry};
use tauri_plugin_autostart::MacosLauncher;
use tauri_plugin_store;

pub fn create_plugins() -> Vec<TauriPlugin<Wry>> {
  vec![
    tauri_plugin_single_instance::init(|app, _, cwd| {
      Notification::new(&app.config().tauri.bundle.identifier)
        .title("程序已经在运行，请勿重复打开")
        .body(cwd)
        .icon("pot")
        .show()
        .unwrap();
    }),
    tauri_plugin_store::Builder::<Wry>::default().build(),
    tauri_plugin_autostart::init(MacosLauncher::LaunchAgent, Some(vec![])),
  ]
}
