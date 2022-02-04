//1.Get rid of switch statements
//bad code
function getPokemon(type) {
  let pokemon;
  switch (type) {
    case 'Water':
      pokemon = 'Squirtle';
      break;
    case 'Fire':
      pokemon = 'Charmander';
      break;
    case 'Plant':
      pokemon = 'Bulbasur';
      break;
    case 'Electric':
      pokemon = 'Pikachu';
      break;
    default:
      pokemon = 'Mew';
  }
  return pokemon;
}
console.log(getPokemon('Fire')); // Result: Charmander

//do this instead to write clean
const pokemon = new Map([
    ['Water', 'Squirtle'],
    ['Fire', 'Charmander'],
    ['Plant', 'Bulbasur'],
    ['Electric', 'Pikachu']
  ]);

function getPokemon(type) {
  return pokemon.get(type) || 'Mew';
}

console.log(getPokemon('Fire')); // Result: Charmander
console.log(getPokemon('unknown')); // Result: Mew


//2.Make your conditionals descriptive
//bad code
function checkGameStatus() {
  if (
    remaining === 0 ||
    (remaining === 1 && remainingPlayers === 1) ||
    remainingPlayers === 0
  ) {
    quitGame();
  }
}
//clean code

//3.Use guard clauses to avoid nested if statements
//bad code
function publishTweet(tweet) {
  if (isLoggedIn()) {
    if (tweet) {
      if (isTweetDoubleChecked()) {
        tweetIt(tweet);
      } else {
        throw new Error('Dont publish without double checking your tweet');
      }
    } else {
      throw new Error("Your tweet is empty, can't publish it");
    }
  } else {
    throw new Error('You need to log in before tweeting');
  }
}
//clean code
function publishTweet(tweet) {

  if (!isLoggedIn()) {
    throw new Error('You need to log in before tweeting');
  }
  if (!tweet) {
    throw new Error("Your tweet is empty, can't publish it");
  }
  if (!isTweetDoubleChecked()) {
    throw new Error('Dont publish without double checking your tweet');
  }

  tweetIt(tweet);
}

//4.Avoid code duplication
//bad code
function getJavascriptNews() {
    const allNews = getNewsFromWeb();
    const news = [];
 
    for (let i = allNews.length - 1; i >= 0; i--){
        if (allNews[i].type === "javascript") {
            news.push(allNews[i]);
        }
    }
 
    return news;
}
 
function getRustNews() {
    const allNews = getNewsFromWeb();
    const news = [];
 
    for (let i = allNews.length - 1; i >= 0; i--){
        if (allNews[i].type === "rust") {
            news.push(allNews[i]);
        }
    }
 
    return news;
}

function getGolangNews() {
  const news = [];
  const allNews = getNewsFromWeb();

  for (let i = allNews.length - 1; i >= 0; i--) {
    if (allNews[i].type === 'golang') {
      news.push(allNews[i]);
    }
  }

  return news;
}
//clean code

function getNews(type) {
  const allNews = getNewsFromWeb();
  return getNewsContent(allNews, type);
}

function getNewsContent(newsList, type) {
  return newsList
    .filter(newsItem => newsItem.type === type)
    .map(newsItem => newsItem.content);
}

//5.Functions should only do one thing
//bad code

function startProgram() {
  if (!window.indexedDB) {
    window.alert("Browser not support indexeDB");
  } else {
    let openRequest = indexedDB.open("store", 1);
 
    openRequest.onupgradeneeded = () => {};
 
    openRequest.onerror = () => {
      console.error("Error", openRequest.error);
    };
 
    openRequest.onsuccess = () => {
      let db = openRequest.result;
    };
 
    document.getElementById('stat-op').addEventListener('click', () => {});
    document.getElementById('pre2456').addEventListener('click', () => {});
    document.getElementById('cpTagList100').addEventListener('change', () => {});
    document.getElementById('cpTagList101').addEventListener('click', () => {});
    document.getElementById('gototop').addEventListener('click', () => {});
    document.getElementById('asp10').addEventListener('click', () => {});
 
    fetch("employeList.json")
      .then(res => res.json())
      .then(employes => {
        document.getElementById("employesSelect").innerHTML = employes.reduce(
          (content, employe) => employe.name + "<br>",
          ""
        );
      });
 
    document.getElementById("usernameLoged").innerHTML = `Welcome, ${username}`;
  }
}
//clean code
function startProgram() {
  if (!window.indexedDB) {
    throw new Error("Browser doesn't support indexedDB");
  }

  initDatabase();
  setListeners();
  printEmployeeList();
}

function initDatabase() {
  let openRequest = indexedDB.open('store', 1);

  openRequest.onerror = () => {
    console.error('Error', openRequest.error);
  };
  openRequest.onsuccess = () => {
    let db = openRequest.result;
  };
}

function setListeners() {
  document.getElementById('stat-op').addEventListener('click', () => {});
  document.getElementById('pre2456').addEventListener('click', () => {});
  document.getElementById('cpTagList100').addEventListener('change', () => {});
  document.getElementById('cpTagList101').addEventListener('click', () => {});
  document.getElementById('gototop').addEventListener('click', () => {});
  document.getElementById('asp10').addEventListener('click', () => {});
}

async function printEmployeeList() {
  const employees = await getEmployeeList();

  document.getElementById('employeeSelect').innerHTML = formatEmployeeList(employees);
}

function formatEmployeeList(employees) {
  return employees.reduce(
    (content, employee) => content + employee.name + '<br>',
    ''
  );
}

function getEmployeeList() {
  return fetch('employeeList.json').then(res => res.json());
}
