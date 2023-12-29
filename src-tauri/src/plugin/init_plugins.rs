use tauri::{plugin::TauriPlugin, Builder, Wry};

pub fn init_plugins(builder: Builder<Wry>, plugins: Vec<TauriPlugin<Wry>>) -> Builder<Wry> {
  plugins
    .into_iter()
    .fold(builder, |builder, init_fn| builder.plugin(init_fn))
}
