"""Local static preview server for the ES-module prototype."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from functools import partial
class PreviewServer(ThreadingHTTPServer):
    request_queue_size = 128
    daemon_threads = True
class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()
    def log_message(self, *args):
        pass
if __name__ == '__main__':
    root = str(Path(__file__).resolve().parent)
    server = PreviewServer(('127.0.0.1', 8769), partial(Handler, directory=root))
    print('Preview: http://localhost:8769', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()
