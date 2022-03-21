var convert = () => {
  var arrayBuffer = this.result;
  var buffer = new Uint8Array(arrayBuffer);

  data = parseWav(buffer);

  var config = {
    mode: 3,
    channels: 1,
    samplerate: data.sampleRate,
    bitrate: data.bitsPerSample,
  };

  var mp3codec = Lame.init();
  Lame.set_mode(mp3codec, config.mode || Lame.JOINT_STEREO);
  Lame.set_num_channels(mp3codec, config.channels || 2);
  Lame.set_num_samples(mp3codec, config.samples || -1);
  Lame.set_in_samplerate(mp3codec, config.samplerate || 44100);
  Lame.set_out_samplerate(mp3codec, config.samplerate || 44100);
  Lame.set_bitrate(mp3codec, config.bitrate || 128);
  Lame.init_params(mp3codec);

  var array = Uint8ArrayToFloat32Array(data.samples);

  var mp3data = Lame.encode_buffer_ieee_float(mp3codec, array, array);

  var url = "data:audio/mp3;base64," + encode64(mp3data.data);
  convertedPlayer.src = url;
  convertedLink.href = url;

  var name = file.name.substr(0, file.name.lastIndexOf("."));
  convertedLink.textContent = name + ".mp3";

  converted.style.display = "block";

  Lame.encode_flush(mp3codec);
  Lame.close(mp3codec);
  mp3codec = null;
};
