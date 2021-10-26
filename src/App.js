import {Input, Button} from 'antd';
import 'antd/dist/antd.css';
import {useState} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const {TextArea} = Input;

function inArray(search, array) {
    for (var i in array) {
        if (array[i] == search) {
            return true;
        }
    }
    return false;
}

function App() {
    const [oldcontent, setOldcontent] = useState('')
    const [functionlist, setFunctionlist] = useState('')
    const [newcontent, setNewcontent] = useState('')
    const [copied, setCopied] = useState(false)
    const kk = () => {
        setNewcontent('')
        const OldList = JSON.parse(oldcontent.trim())
        const FunctionList = functionlist.split(',')
        let NewList = []
        console.log(OldList)
        console.log(FunctionList)
        for (let i = 0; i < OldList.length; i++) {
            if (inArray(OldList[i].name, FunctionList) && OldList[i].type === 'function') {
                NewList.push(OldList[i])
            }
        }
        setNewcontent(JSON.stringify(NewList))
    }
    const kk2 = () => {
        setNewcontent()
    }
    const notify = () => toast("已复制", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="h1">精简Abi代码</h1>
                <div className="old">输入原始abi代码</div>
                <TextArea rows={5} showCount className="new" onChange={(e) => {
                    console.log(e.target.value)
                    setOldcontent(e.target.value)
                }}/>
                <div className="new">输入保留的方法</div>
                <TextArea rows={2} className="new" onChange={(e) => {
                    console.log(e.target.value)
                    setFunctionlist(e.target.value)
                }}/>
                <div><Button type="button" onClick={() => kk()}>精简</Button></div>
                <div className="new">精简后的代码</div>
                <TextArea rows={5} showCount className="new" value={newcontent}/>
                <div>
                    <Button type="button" onClick={() => kk2()}>清空</Button>
                    <CopyToClipboard text={newcontent}
                                     onCopy={() => {
                                         setCopied(true)
                                         notify()
                                     }}>
                        <Button type="button">复制</Button>
                    </CopyToClipboard>
                </div>
            </header>
            <ToastContainer></ToastContainer>
        </div>
    );
}

export default App;
