use tauri::{plugin::TauriPlugin, Wry};
use tauri_plugin_store;

pub fn create_plugins() -> Vec<TauriPlugin<Wry>> {
  vec![tauri_plugin_store::Builder::<Wry>::default().build()]
}
