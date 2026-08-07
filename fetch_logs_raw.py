import urllib.request, json, zipfile, io

url = 'https://api.github.com/repos/pragathipandiyan05-netizen/healthcare/actions/runs'
req = urllib.request.Request(url)
with urllib.request.urlopen(req) as response:
    data = json.loads(response.read().decode())

run_id = data['workflow_runs'][0]['id']

# Fetch the raw logs for the workflow run
logs_url = f"https://api.github.com/repos/pragathipandiyan05-netizen/healthcare/actions/runs/{run_id}/logs"
req = urllib.request.Request(logs_url)
try:
    with urllib.request.urlopen(req) as response:
        archive = zipfile.ZipFile(io.BytesIO(response.read()))
        # Print the contents of the step that failed (Install dependencies)
        for name in archive.namelist():
            if 'Install dependencies' in name:
                with archive.open(name) as f:
                    print(f.read().decode('utf-8'))
except Exception as e:
    print(f"Error fetching logs: {e}")
