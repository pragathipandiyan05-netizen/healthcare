import urllib.request, json

url = 'https://api.github.com/repos/pragathipandiyan05-netizen/healthcare/actions/runs'
req = urllib.request.Request(url)
with urllib.request.urlopen(req) as response:
    data = json.loads(response.read().decode())

run_id = data['workflow_runs'][0]['id']
print(f"Latest run ID: {run_id}")

jobs_url = f"https://api.github.com/repos/pragathipandiyan05-netizen/healthcare/actions/runs/{run_id}/jobs"
req = urllib.request.Request(jobs_url)
with urllib.request.urlopen(req) as response:
    jobs_data = json.loads(response.read().decode())

for job in jobs_data['jobs']:
    print(f"Job: {job['name']}, Status: {job['conclusion']}")
    for step in job['steps']:
        if step['conclusion'] == 'failure':
            print(f"Failed Step: {step['name']}")
