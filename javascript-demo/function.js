// 자바스크립트에서 함수는 일급객체이다.
// 1. 함수의 매개변수가 될 수 있다.
function func1(arg) {
  arg();
}

function func2() {
  console.log("func2");
}

func1(func2); // func2

// 2. 함수의 리턴값이 될 수 있다.
function func3(arg) {
  return arg;
}

function func4() {
  console.log("func2");
}

func3(func4)(); // func2

// 3. 할당 명령문의 대상이 될 수 있다.
// 4. 동일 비교의 대상이 될 수 있다.
const func5 = function (arg) {
  return arg;
};

func5(1); // 1

// ----------------------------------------------------------------------------------------------------
// 함수의 매개변수
// 1. 기본값 매개변수
function func6(arg = 1) {
  return arg;
}

func6(); // 1, 기본값 설정 안하면 undefined

// 2. 나머지 매개변수
function func7(first, ...rest) {
  return rest;
}

func7(1, 2, 3, 4, 5); // [2, 3, 4, 5]

// 3. arguments 객체
function func8(arg) {
  console.log(arguments);
}

func8(1); // arguments 객체

// ----------------------------------------------------------------------------------------------------
// 함수 생성 방법
// 1. 함수 선언문
function func9(arg) {}

// 2. 함수 표현식
const func10 = function (arg) {};

// 3. Function 생성자 함수
const func11 = new Function(arg, "return 1");

// 4. 화살표 함수 표현식
const func12 = (arg) => {};

// ----------------------------------------------------------------------------------------------------
// 함수 사용 패턴
// 1. 즉시 실행 함수
(function func13(arg) {
  console.log(arg);
})();

// 2. 재귀함수
function func14(count) {
  if (count === 5) return count;

  func14(count + 1);
}

func14(1);

// 3. 중첩함수
function func15(arg) {
  function innerFunc(input) {
    console.log(input);
  }

  innerFunc(arg);
}

// 4. 콜백함수
function func16(arg) {
  arg();
}

func16(() => console.log(1)); // 1
