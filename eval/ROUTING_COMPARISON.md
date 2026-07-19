# Routing Comparison Protocol

Run every case in `dashboard-routing-cases.json` once with the current `wix-app` skill and once with this candidate skill. Keep the site state, prompt, model, and available tools equivalent.

For each run, capture the agent trace, generated files, browser console/network evidence, and outcome screenshot. Score each observable criterion as `met`, `partial`, or `missed`.

Mark a route as correct only when the implementation primitive and behavior both match. A custom table that looks correct does not pass a case whose expected route is Auto Patterns. A page that compiles but blanks after loading does not pass runtime validation.

Compare the two runs on:

1. correct primitive selection;
2. number of unsupported assumptions;
3. amount of custom code where a documented primitive existed;
4. data-schema completeness, including existing record handling;
5. browser-visible correctness after loading settles.
