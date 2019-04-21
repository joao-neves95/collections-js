// BENCHMARKED IN: https://jsperf.com/github-joao-neves95-js-system-collections-dictionary

// 1 _ 110,124,954 ±1.08% - 87% slower
const func1 = () =>  {
    return dictObj["499"];
}

func1();


// 2 _ 5,903 ±7.89% - 100% slower
const func2 = () => {
    for (let j = 0; j < dictArr.length; ++j) {
      if (Object.keys( dictArr[j] )[0] === "499")
        return dictArr[j]["499"];
    }
}

func2();


// 3 _ 882,491,834 ±3.50% - fastest
const func3 = () => {
    let currDict;

    for (let j = 0; j < dictArr.length; ++j) {
      currDict = dictArr[j];
      if (Object.keys( currDict )[0] === "499")
        return currDict["499"];
    }
}

func3;
