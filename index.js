let allInstances = [];
const minSuccessPercentage = 80;

async function fetchInstances() {
    let response = await fetch("https://searx.space/data/instances.json");
    let rjson = await response.json();
    // console.log(rjson.instances);
    for ([instance, instanceData] of Object.entries(rjson.instances)) {
        instanceData.url = instance;
        // Instance filtering
        if (instanceData.generator != "searxng" || instanceData.network_type == "tor" || instanceData.error !== undefined || instanceData.timing.search_go.success_percentage < minSuccessPercentage) {
            continue;
        }

        allInstances.push(instanceData);
    }

    localStorage.setItem("instances", JSON.stringify({ expiry: (Date.now() + (3600 * 3 * 1000)), "instances": allInstances }));
}

async function getInstances() {
    let storedInstances = JSON.parse(localStorage.getItem("instances"));

    if (storedInstances === null || storedInstances.expiry < Date.now()) {
        await fetchInstances();
        return;
    }

    allInstances = storedInstances.instances
}

function setRandomInstance() {
    let randomInstance = allInstances[Math.floor(Math.random() * allInstances.length)]
    console.log("using", randomInstance.url);
    document.getElementById("search").action = randomInstance.url;
}

function setPreferences() {
    let myPreferences = "eJxtVk1v5DYM_TWZi7FBd7dFu4c5Bei1Bbp3g5Zom7EkevUxM86vLzW2YymTQ5wRRZEU-fgoBREH9oThfDLghgQDnsGYk2EFBs_oTpAiK7azwYjngXkweCIreu3s-bacf_qEJ4txZH3-95__fp4C9BgQvBrPv53iiBbPgfL5k8eQTAwtu9bhtY3Qnf8GE_CkmVrZZHNBf2aQ5TP74bQea0NcJBQNfjqBvoBTqNvNwXr8V0K_tOTaSFE0VyG5nhxFOa48G7N7ogCdEQPoBnJybY34hr5tbQqknr69dOSGth3QoQcja53UlP8G_lza3HMR2nb9L3u_ruBiqRwi-DjnjBXCBUbmB0EjeRFb-ZtFnGLq5NiFNHIl2cPVQGaxHElyeqhdyCIX687DpfLuUWuSIAMrAtNY1AQivtJEGiJU0eObA1tKnBjzVTb00Gi8p1viCOXWPRnNGkgZkGS5vmvvyU0EqkjklbqltIVRbuqMlK2Ser6SLiX5Fh3zVAXSG1KTr6xPOVrwy8ezgZNXlY-ZvDRKB6Lak7kfH2bWOqfhQwrf5Q-KRUrZkI7sPTrphndNjReSbAlY6jBJ0h0oPsR54eUDqHTSKDhg6Tqfw15mElNRfoK_0UWCVYTSPyJILswGwli46sBpBXY-0DWPHDOwLMyy4hldDgWLMzOi_4DRkGb0KeQrr67DlLrkYtrW451D9s03s3hSVamyHyCBqCAxYM7QEfa-N6dOCgob3o59zWpC34yp2xyI2Zgb7b7IWbMC09LbIJwBu7almzKc9JECCwLL97sYklbyS8N9o9gNwlll5wecCVZmKvLx9mU7dVT66_fvf96O5ZVN78GCmUcoL7OybSN1WhqY5wIqPtnOVElHCTSSaoIa2YAvzawRKdbY5M92lcjTItUNI0_gDsuSWIFyeXzWubzHWin1JV4K3262m01h2hA89qW6WwAO8zmADv2w55O7EPHZh22dyyvF5eqq3TKg3TXKnFi-EJa00nvEJnAfr-Cx0YITJW22bEd77TkzxZF2rx1NVWc-vfzx9Nc3voq8eX16-f3px4-3ZYJmZhMEB_UUmEFNMFCIO3oyB0jvTRLW9YpdEdkIAoH8eYclCv1Y3K-11l9wspeno9jJgMH43sBqFCJoqGqVK99oYvcspQ2LY7fYig8sv4qfUjIJC0Io0ksOijBhnhpL3nNBYF9vBcQ1qfjGNQPvTZElgQrbVsKxkv8menDBCIXqg5xyL_5KHCtTZHV3qEjtciexy12e10L9S6X_SoLf7cBJmKEa7dnDnEtSnlAp066qyHTD1MMkHzametCsJtcm-6TxMppDFExGIdCdRdeJWFmQgSPMW_NOmGWo98shICdVIk4l3gvZrraaf7jKfeB-Ln0YzhlqjYzZdGtyCnfEUjxYVZ40amIZBr3ha92ZD-Yke1RGmG1W1--ipmE4YAOjzTVby3682GaTpK7hnOns9rytnhna9fV49fLY29ju2JaXUCtDbMIlvOPjc0NjHobr4sHKyCHKIwjFjRCPenRjZKzEO2Zr-TYMZIaq9aW9yMvVCCt9oml6ecL2_LAjzZNnWpu8Ef82Z_0k5C3QOv8PbnFwGw==";
    document.getElementById("preferences").value = myPreferences;
    // TODO: Use preferences from the actual settings.
    // For encoding use atob and btoa.
}

async function main() {
    await getInstances();
    setRandomInstance();
    setPreferences();
}

window.onload = main;