'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the roadsAndLibraries function below.
function roadsAndLibraries(n, c_lib, c_road, cities) {
    if(c_lib<=c_road ||cities.lenght==0)
        return n*c_lib;
    else{
        var visitedc = new Array(n+1);
        //create adjcities
        var adjCities = new Array(n+1);
        var connectedComps = 0;
        var cost = 0;
        for(var i =0; i<cities.length;i++){
            if(!adjCities[cities[i][0]])
                adjCities[cities[i][0]] = []
            if(!adjCities[cities[i][1]])
                adjCities[cities[i][1]] = []
                
            adjCities[cities[i][0]].push(cities[i][1])
            adjCities[cities[i][1]].push(cities[i][0])
        }
        console.log(adjCities)
        for(var j = 1 ; j< n+1;j++) {
            if(!visitedc[j]){
                dfs(j,adjCities,visitedc);
                connectedComps++
            }
        }
        return c_lib*connectedComps + c_road*(n-connectedComps);
    }

}
function dfs(city, adjcities, visitedc){
    visitedc[city]= true;
    for(var i = 0; Array.isArray(adjcities[city]) && i<adjcities[city].length; i++){
        if(!visitedc[adjcities[city][i]])
           dfs(adjcities[city][i],adjcities,visitedc);
    }
}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const nmC_libC_road = readLine().split(' ');

        const n = parseInt(nmC_libC_road[0], 10);

        const m = parseInt(nmC_libC_road[1], 10);

        const c_lib = parseInt(nmC_libC_road[2], 10);

        const c_road = parseInt(nmC_libC_road[3], 10);

        let cities = Array(m);

        for (let i = 0; i < m; i++) {
            cities[i] = readLine().split(' ').map(citiesTemp => parseInt(citiesTemp, 10));
        }

        const result = roadsAndLibraries(n, c_lib, c_road, cities);

        ws.write(result + '\n');
    }

    ws.end();
}
