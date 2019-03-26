/* eslint no-restricted-globals: 'off' */
// Turn duration of the movies from hours to minutes 
function turnHoursToMinutes(array){
  return array.map((movie) => {
    var duration = movie.duration;
    var minutes=0, idx;

    if (typeof duration === "number") return {duration : duration};

    if (duration.indexOf("h") != -1 && duration.indexOf("m") != -1) {
      idx = duration.indexOf("h");
      minutes = duration[idx - 1] * 60;

      idx = duration.indexOf("m");
      minutes += duration[idx - 2] * 10;
      minutes += parseInt(duration[idx - 1]);
    }

    if (duration.indexOf("h") != -1){
      idx = duration.indexOf("h");
      minutes = duration[idx - 1] * 60;
    }

    if (duration.indexOf("m") != -1){
      idx = duration.indexOf("m");
      minutes += duration[idx - 2] * 10;
      minutes += parseInt(duration[idx - 1]);
    }

    return Object.assign({},movie,{duration:minutes}); 
  });
}

// Get the average of all rates with 2 decimals 

function ratesAverage (array){
  var avg =  array.reduce((acum, movie) => {
    if (movie.rate.length===0) return acum;
    return acum += movie.rate;
  },0);

  return parseFloat((avg/array.length).toFixed(2));
}

// Get the average of Drama Movies

function dramaMoviesRate (array){

  var dramaMovies = array.filter(movie=>{
    return movie.genre.includes("Drama");
  });

  if (dramaMovies.length===0) return undefined;

  return ratesAverage(dramaMovies);

}

// Order by time duration, in growing order

function orderByDuration (array){
  var goodDurationMovies = turnHoursToMinutes(array);
  var output = goodDurationMovies.sort((a, b) => {
    if (a.duration > b.duration) return 1;
    if (a.duration < b.duration) return -1;
    if (a.title > b.title) return 1;
    if (a.title > b.title) return -1;
    return 0;
  });
  return output;
}

// How many movies did STEVEN SPIELBERG

function howManyMovies (array){
  if (array.length === 0) return undefined;
  var output = array.filter(movie=> movie.director === "Steven Spielberg");
  output = output.filter(movie=> movie.genre.includes("Drama"));
  output = output.length;
  return `Steven Spielberg directed ${output} drama movies!`;
}

// Order by title and print the first 20 titles

function orderAlphabetically (array){
  var output = array.map(movie=>movie.title);
  return output.sort().splice(0,20);
}

// Best yearly rate average

function bestYearAvg(movies){
  if(movies.length === 0){return;}
 
  var bestYear = 0, bestRate = 0;
   let moviesByYear = {};
   movies.forEach(movie => {
     if(!moviesByYear[movie.year]){
       moviesByYear[movie.year] =  [];
     }
     moviesByYear[movie.year].push(movie);
   });
   for(let year in moviesByYear){
     let rate = ratesAverage(moviesByYear[year]);
     if(rate > bestRate){
       bestRate = rate;
       bestYear = year;
     }
   }
   return (`The best year was ${bestYear} with an average rate of ${bestRate}`);
 }