import React, { useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import assert from 'power-assert';

const testResults = [];
//==============================答题部分 start==============================

/********************第 1 题**********************/
// 将下划线风格的变量名转换成驼峰风格，如： 输入 alipay_first_quiz 返回 alipayFirstQuiz
// 注：下划线只会出现在单词中间，不会出现在开头或者结尾

function snake2camel(str) {
  // todo
  return str ? str.replace(/_\w/g, c => c[1].toUpperCase()) : '';
}

/*******单测部分*******/
try {
  assert.equal(snake2camel(), '');
  assert.equal(snake2camel(undefined), '');
  assert.equal(snake2camel(null), '');
  assert.equal(snake2camel(''), '');
  assert.equal(snake2camel('alipay'), 'alipay');
  assert.equal(snake2camel('alipay_first_quiz'), 'alipayFirstQuiz');
  assert.equal(snake2camel('aaaa_bb_ccc'), 'aaaaBbCcc');

  testResults[0] = '通过';
} catch {
  testResults[0] = '不通过';
}

/********************第 2 题**********************/
// 将驼峰风格的变量名转换成下划线风格，如： 输入 alipayFirstQuiz 返回 alipay_first_quiz

function camel2snake(str) {
  // todo
  return str ? str.replace(/[A-Z]/g, c => '_' + c.toLowerCase()) : '';
}

/*******单测部分*******/
try {
  assert.equal(camel2snake(), '');
  assert.equal(camel2snake(''), '');
  assert.equal(camel2snake('alipay'), 'alipay');
  assert.equal(camel2snake('alipayFirstQuiz'), 'alipay_first_quiz');
  assert.equal(camel2snake('aaaaBbCcc'), 'aaaa_bb_ccc');

  testResults[1] = '通过';
} catch {
  testResults[1] = '不通过';
}

/********************第 3 题**********************/
// 给出一个数组和一个整数目标值 target，你需要找出 2 个数字，他们相加之和等于目标数字，并返回这两个数字的数组下标（升序排序）
// 注：你可以假设给出的入参一定可以找出这样 2 个数字，并且是唯一解
// 注：数组中同一个数字不能使用两遍
// 例子：数组 [3,4,7,15] 目标 10，则 3 + 7 满足目标 10，返回他们的下标 [0, 2]

function findSum(arr, target) {
  // todo
  let res = [];
  arr.some((num, i) => {
    return arr.some((find, j) => {
      const flag = target - num === find;
      if (flag) res = [i, j];
      return flag;
    });
  });

  return res;
}

try {
  assert.deepStrictEqual(findSum([1, 2], 3), [0, 1]);
  assert.deepStrictEqual(findSum([4, 5, 13, 9], 13), [0, 3]);
  assert.deepStrictEqual(findSum([4, 5, 13, 9], 14), [1, 3]);
  assert.deepStrictEqual(findSum([4, 5, 13, 9], 9), [0, 1]);
  assert.deepStrictEqual(findSum([1, 8, 10, 11], 21), [2, 3]);

  testResults[2] = '通过';
} catch {
  testResults[2] = '不通过';
}

/********************第 4 题**********************/
// 输入一个合法的 URL 返回它的 query string 解析结果（数据结构参考下方单元测试）

function parseQueryString(url) {
  // todo
  if (!url) return {};
  const str = url.split('?')[1];

  const obj = {};

  if (str) {
    const KVarr = str.split('&');
    KVarr.forEach(KVstr => {
      const KV = KVstr.split('=');
      if (KV[0]) obj[KV[0]] = KV[1] ? decodeURIComponent(KV[1]) : '';
    });
  }
  return obj;
}

try {
  assert.deepStrictEqual(parseQueryString(), {});
  assert.deepStrictEqual(parseQueryString('https://google.com'), {});
  assert.deepStrictEqual(parseQueryString('https://google.com?'), {});
  assert.deepStrictEqual(parseQueryString('https://google.com/?name=jeff&nick=dean'), { name: 'jeff', nick: 'dean' });
  assert.deepStrictEqual(parseQueryString('https://google.com/?name=jeff&nick=&'), { name: 'jeff', nick: '' });
  assert.deepStrictEqual(parseQueryString('https://google.com/?name=jeff&name'), { name: '' });
  assert.deepStrictEqual(parseQueryString('https://google.com/?q=%E6%94%AF%E4%BB%98%E5%AE%9D'), { q: '支付宝' });

  testResults[3] = '通过';
} catch {
  testResults[3] = '不通过';
}

/********************第 5 题**********************/
// 将一个 JSON Object 转换成 query string
// 如：输入 { a:1, b:2 } 输出 a=1&b=2
// 注意：需要考虑 URL 转义的情况，如中文或特殊字符

function toQueryString(map) {
  // todo
  if (!map) return '';
  const kvarr = Object.keys(map).map(key => {
    const value = map[key] ? encodeURIComponent(map[key]) : '';
    return key + '=' + value;
  });

  return kvarr.join('&');
}

try {
  assert.equal(toQueryString(), '');
  assert.equal(toQueryString({}), '');
  assert.equal(toQueryString({ a: 1, b: 2 }), 'a=1&b=2');
  assert.equal(toQueryString({ a: 1, b: undefined }), 'a=1&b=');
  assert.equal(toQueryString({ a: 1, b: null }), 'a=1&b=');
  assert.equal(toQueryString({ a: '/' }), 'a=%2F');

  testResults[4] = '通过';
} catch {
  testResults[4] = '不通过';
}

//==============================答题部分 end================================

//==============================说明部分 start==============================

function App() {
  const [list, setList] = useState([]);
  const [text, setText] = useState('');
  const [selectList, setSelectList] = useState([]);

  let dragTarget = useRef();

  const allowAdd = useMemo(() => {
    return !list.includes(text) && !!text.trim();
  }, [list, text]);

  const showList = useMemo(() => {
    return list.reduce((arr, item) => {
      if (item.includes(text)) {
        arr.push(item);
      }
      return arr;
    }, []);
  }, [list, text]);

  const onChange = e => {
    e.persist();
    const str = e.target.value;
    setText(str);
  };

  const onEnter = e => {
    e.persist();
    if (e.keyCode === 13 && allowAdd) {
      setList([...list, text]);
      setText('');
    }
  };

  const onSelect = item => {
    return e => {
      e.persist();
      if (e.target.checked) {
        setSelectList([...selectList, item]);
      } else {
        const arr = [...selectList];
        arr.splice(arr.indexOf(item), 1);
        setSelectList(arr);
      }
    };
  };

  const onDelete = item => {
    return e => {
      e.persist();
      const arr = [...list];
      arr.splice(arr.indexOf(item), 1);
      setList(arr);

      const arr2 = [...selectList];
      arr2.splice(arr.indexOf(item), 1);
      setSelectList(arr2);
    };
  };

  const onDeleteAll = e => {
    e.persist();
    const arr = [...list];
    selectList.forEach(item => {
      arr.splice(arr.indexOf(item), 1);
    });
    setList(arr);
    setSelectList([]);
  };

  const onDragStart = e => {
    e.persist();
    console.log(e);
    dragTarget.current = e.target;
  };

  const onDragOver = e => {
    e.persist();
    var target = e.target;

    function _index(el) {
      var index = 0;
      if (!el || !el.parentNode) {
        return -1;
      }
      while (el && (el = el.previousElementSibling)) {
        index++;
      }
      return index;
    }

    if (target.nodeName === 'LI' && target !== dragTarget.current) {
      const draggingIndex = _index(dragTarget.current);

      if (draggingIndex < _index(target)) {
        const newList = move(draggingIndex, draggingIndex + 1);
        setList(newList);
        dragTarget.current = target;
      } else {
        const newList = move(draggingIndex, draggingIndex - 1);
        setList(newList);
        dragTarget.current = target;
      }
    }
  };

  const move = (startIndex, toIndex) => {
    const arr = [...list];
    arr.splice(toIndex, 0, ...arr.splice(startIndex, 1));
    return arr;
  };
  return (
    <div className="App">
      <div>
        <h3>题目列表</h3>
        <p>见左侧代码区域部分，共 5 题。</p>
      </div>
      <div>
        <h3>答题说明</h3>
        <ol>
          <li>请 Fork 到自己的账号下完成题目</li>
          <li>所有题目需要用原生 JS 实现，不能借助第三方类库</li>
          <li>答题部分在题干内 TODO 的位置，入参出参格式可以参考测试用例</li>
          <li>每道题的下方有单测，可以验证代码正确性，答题时也可自行添加用例</li>
          <li>
            尽可能完成所有题目, <strong>有疑问随时联系对应的面试官</strong>
          </li>
        </ol>
        <p></p>
      </div>
      <div>
        <h3>单测结果</h3>
        <ul>
          <li>第 1 题：{testResults[0]}</li>
          <li>第 2 题：{testResults[1]}</li>
          <li>第 3 题：{testResults[2]}</li>
          <li>第 4 题：{testResults[3]}</li>
          <li>第 5 题：{testResults[4]}</li>
        </ul>
      </div>
      <div>
        <h3>React 实践</h3>
        <p>
          使用 React 完成一个简单的 Todo List 组件，包含 Todo 事项的 <strong>新增、删除、修改、关键词筛选</strong> 这些操作。
        </p>
        <p>
          如果这些对你来说比较简单的话，可以试试能否再加上 <strong>列表的拖拽排序</strong> 。
        </p>
        <p> --- 在这里渲染你的 React 组件吧（下方只是功能示意图，样式可以自由发挥） ---</p>

        <p>描述：输入文本如果不存在则可以回车键添加，否则则以模糊查找的方式搜索列表，可以选中一键删除，可以拖动排序</p>
        <input type="text" onChange={onChange} onKeyDown={onEnter} value={text} />
        {text && <span>已检索出全部结果{allowAdd && <span>(可回车添加)</span>}</span>}
        <ul onDragOver={onDragOver}>
          {showList.map((item, i) => {
            return (
              <li key={i} draggable="true" onDragStart={onDragStart}>
                <input type="checkbox" id={'item' + i} onChange={onSelect(item)} checked={selectList.includes(item)} />
                <label for={'item' + i}>{item}</label>
                <button onClick={onDelete(item)}>删除</button>
              </li>
            );
          })}
        </ul>

        {!showList.length && <p>列表空空如也</p>}
        {!!selectList.length && (
          <p>
            已选中：{selectList.join(',')} <button onClick={onDeleteAll}>一键删除</button>
          </p>
        )}

        <img src="https://gw.alipayobjects.com/mdn/rms_e0a0c6/afts/img/A*sMe6TrKUF1IAAAAAAAAAAAAAARQnAQ" alt="example" />
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
//==============================说明部分 end================================
