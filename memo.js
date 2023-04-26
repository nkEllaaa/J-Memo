function getMemoTitle() {
  const memoTitle = document.querySelector('#memotitle').value;
  return memoTitle;
}

function getMemoContent() {
  const memoContent = document.querySelector('#memo').value;
  return memoContent;
}

function resetInput() {
  document.querySelector('#memotitle').value = '';
  document.querySelector('#memo').value = '';
}

function createMemo() {
  const title = getMemoTitle();
  const content = getMemoContent();

  const memoObj = {
    title: title,
    content: content,
  };

  return memoObj;
}

const memolists = [];

function saveMemo(memo) {
  // 기존 데이터 불러오기
  const savedData = JSON.parse(localStorage.getItem('memolists')) || [];

  // 새로운 데이터 추가
  savedData.push(memo);

  // 로컬 스토리지에 저장
  localStorage.setItem('memolists', JSON.stringify(savedData));
}

function getMemos() {
  const memos = localStorage.getItem('memolists');
  if (memos) {
    return JSON.parse(memos);
  } else {
    return [];
  }
}

function showMemo() {
  const memos = getMemos();
  memos.forEach(function (memo) {
    const $memoLi = createMemoLi(memo);
    const $memoUl = document.querySelector('.memolists');
    $memoUl.appendChild($memoLi);
  });

  const savedData = JSON.parse(localStorage.getItem('memolists')) || [];

  // li요소 "들"
  const $memoLists = savedData.map(createMemoLi);
  const $memoUl = document.querySelector('.memolists');
  // 내용을 채워넣기전에 청소하기.
  $memoUl.innerHTML = '';
  // 메모들을 전부 li요소로 만들었는데
  // 이걸 memoUL에 뿌려준다.
  $memoUl.append(...$memoLists);
}
//////////////////////////////////////////////////////////////////////////////////
// 새로운 메모를 추가하는 함수
const addMemo = () => {
  const $memoTitle = document.querySelector('#memo-title');
  const $memoContent = document.querySelector('#memo-content');

  // 입력한 메모가 없으면 alert를 띄운다.
  if (!$memoTitle.value || !$memoContent.value) {
    alert('제목과 내용을 입력해주세요.');
    return;
  }
  // 메모 데이터를 객체로 만든다.
  const memo = {
    id: Date.now(), // id 값으로 현재 시간을 사용하여 고유한 값으로 설정한다.
    title: $memoTitle.value,
    content: $memoContent.value,
  };
  // 로컬스토리지에 메모를 저장한다.
  const memos = JSON.parse(localStorage.getItem('memos')) || [];
  memos.push(memo);
  localStorage.setItem('memos', JSON.stringify(memos));

  // 메모 리스트에 메모를 추가한다.
  const $memoList = document.querySelector('#memo-list');
  $memoList.appendChild(createMemoLi(memo));

  // 입력 폼의 값을 초기화한다.
  $memoTitle.value = '';
  $memoContent.value = '';
};
/////////////////////////////////////////////////////////////
const removeMemo = event => {
  const target = event.target.parentElement;
  const id = event.target.dataset.id; // 삭제 버튼에 추가한 data-id 값을 가져온다.
  target.remove();

  // 로컬스토리지에서 해당 메모를 삭제한다.
  const memos = JSON.parse(localStorage.getItem('memolists')) || [];
  const updatedMemos = memos.filter(memo => {
    return memo.id === Number(id);
  });
  localStorage.setItem('memolists', JSON.stringify(updatedMemos));
};

function createMemoLi(memo) {
  // 요소 만들기
  // memo를 저장할 li요소만들기
  const $memoLi = document.createElement('li');
  // title을 넣어줄 strong
  const $title = document.createElement('strong');
  // content를 넣어줄 p
  const $content = document.createElement('p');
  // title요소(strong)에 실제 메모의 제목 텍스트를 넣어준다
  $title.innerHTML = memo.title;
  // content요소(p)에 실제 메모의 내용 텍스트를 넣어준다.
  $content.innerHTML = memo.content;
  // title요소와 content요소를 li안에 넣어준다.
  $memoLi.append($title, $content);

  // 삭제 버튼 요소 만들기
  const $deleteButton = document.createElement('button');
  $deleteButton.innerHTML = '삭제';
  // 삭제 버튼을 누르면 해당 메모를 삭제하도록 이벤트 핸들러를 추가한다.
  $deleteButton.addEventListener('click', removeMemo);
  $deleteButton.dataset.id = memo.id;
  // 삭제 버튼을 li요소에 넣어준다.
  $memoLi.append($deleteButton);

  // 그리고 완성된 memoli를 함수호출한 곳에 돌려준다.
  return $memoLi;
}

function buttonOnclickHandler() {
  const title = getMemoTitle();
  const content = getMemoContent();

  if (title.trim() === '') {
    alert('제목을 입력해주세요.');
    return;
  }

  const memoObj = {
    title: title,
    content: content,
  };

  saveMemo(memoObj);
  showMemo();
  resetInput();
}

const $memoButton = document.querySelector('#memosubmit');
$memoButton.onclick = buttonOnclickHandler;

//타이틀의 글자 수 제한
const myTitle = document.querySelector('.memo-title');
const maxTitleLength = parseInt(myTitle.getAttribute('maxlength'));

myTitle.addEventListener('keydown', function (event) {
  const currentLength = this.value.length;

  if (currentLength >= maxTitleLength && event.keyCode !== 8 && event.keyCode !== 46) {
    event.preventDefault();
    return false;
  }
});

//텍스트에어리아의 글자수 제한
const myTextarea = document.querySelector('.memo-text');
const maxLength = parseInt(myTextarea.getAttribute('maxlength'));

myTextarea.addEventListener('keydown', function (event) {
  const currentLength = this.value.length;

  if (currentLength >= maxLength && event.keyCode !== 8 && event.keyCode !== 46) {
    event.preventDefault();
    return false;
  }
});

showMemo();
