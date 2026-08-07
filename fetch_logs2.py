import urllib.request, json

url = 'https://api.github.com/repos/pragathipandiyan05-netizen/healthcare/actions/runs'
req = urllib.request.Request(url)
with urllib.request.urlopen(req) as response:
    data = json.loads(response.read().decode())

run = data['workflow_runs'][0]
print(f"Latest run ID: {run['id']}, Status: {run['status']}, Conclusion: {run['conclusion']}")
