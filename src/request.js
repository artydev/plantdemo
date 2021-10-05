import Plant from "@plant/plant";

export function sendRequest(handler, url) {
  // Create HTTP context's params
  const req = new Plant.Request({
    url
  });
  const res = new Plant.Response({
    url
  });

  // Request peer. Current peer is itself
  const peer = new Plant.Peer({
    uri: new Plant.URI({
      protocol: window.location.protocol,
      hostname: window.location.hostname,
      port: window.location.port
    })
  });

  // Create network context's params
  const socket = new Plant.Socket({ peer });

  return handler({ req, res, socket });
}
