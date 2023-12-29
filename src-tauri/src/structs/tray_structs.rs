use serde::Serialize;

#[derive(Clone, Serialize)]
pub struct SystemTrayPayload {
  message: String,
}

pub enum TrayState {
  NotPlaying,
  Paused,
  Playing,
}
