## 什么是区块链浏览器（Blockchain Explorer）？

这里的浏览器并不是指 Web Broswer，虽然 Explorer 和 Broswer 都可以译做浏览器，下文的区块链浏览器均指前者，指实时监控区块链网络上广播的区块（Block）记录、并以此为基础整理出交易记录（Transcation），账户（Account），地址（Address），智能合约（Smart Contract）、甚至代币（Token）和组织的信息。（实际上确实存在 Blockchain Broswer 项目，参加 BAT 以及 IPFS）

- 比特币：	
	- https://blockchain.info/
	- https://blockexplorer.com/ （开源）
	- https://btc.com/

- 其他币：
	- https://etherscan.io/   以太坊专门浏览器，功能强大
	- https://chainz.cryptoid.info/  支持多种币 

参考的设计给 https://skynet.qtum.info/ 加 Features。 

Roadmap
- 把 Qtum 客户端跑通，（Done）
- 搞清协议，设计 API。（Done）
- 画 UI （Done）
- 添加发送智能合约功能。（Done）
- 叔块 Visulize （Inprogress)

- https://github.com/qtumproject/qtum-bitcore 
- https://github.com/qtumproject/qtumcore-node
- https://github.com/bitpay/bitcoin 
- https://github.com/qtumproject/qtum-bitcore
- https://github.com/bitpay/insight 
- https://github.com/qtumproject/qtum-explorer  




~~~
前置  
https://bitcore.io/guides/full-node
qtum
zeromq
NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
nvm use v6

qtumcore-node
npm install git+ssh://git@github.com:qtumproject/qtumcore-node.git
$(npm bin)/qtumcore-node create mynode
cd mynode 
$(npm bin)/qtumcore-node install git+ssh://git@github.com:qtumproject/insight-api.git
$(npm bin)/qtumcore-node install git+ssh://git@github.com:qtumproject/qtum-explorer.git
find . | grep qtum.conf
./.bitcore/data/qtum.conf

$(npm bin)/qtumcore-node install bitcoind
----

$(npm bin)/qtumcore-node start
~~~
