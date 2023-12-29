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
