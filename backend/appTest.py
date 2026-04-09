from flask import Flask, redirect, request, jsonify
from flask_cors import CORS
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials, SpotifyOAuth

app = Flask(__name__)
CORS(app)  # Allow requests from the frontend

CLIENT_ID = "9093ec5d53bb4551b7c66b0309a97a2f"
CLIENT_SECRET = "45139b6bf8ee4b7e8149490c310a5834"
# NOTE: Change this later to a real redirect URI when doing OAuth
REDIRECT_URI = "https://www.youtube.com"

SCOPE = "user-read-private user-read-email playlist-read-private"

auth_manager = SpotifyClientCredentials(
    client_id=CLIENT_ID,
    client_secret=CLIENT_SECRET
)
sp = spotipy.Spotify(auth_manager=auth_manager)

@app.route("/search")
def search():
    """Search for tracks using app-level credentials."""
    query = request.args.get("q")
    if not query:
        return jsonify({"error": "Missing query parameter `q`"}), 400

    try:
        results = sp.search(q=query, type="track", limit=5)
        tracks = []
        for item in results["tracks"]["items"]:
            tracks.append({
                "name": item.get("name"),
                "artist": item["artists"][0].get("name") if item.get("artists") else None,
                "album": item["album"].get("name") if item.get("album") else None,
                "preview_url": item.get("preview_url")
            })
        return jsonify(tracks)

    except Exception as e:
        print("Spotify API error:", e)
        return jsonify({"error": str(e)}), 500


# Run server
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8081, debug=True)