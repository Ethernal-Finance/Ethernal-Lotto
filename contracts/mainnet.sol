// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/VRFConsumerBase.sol";

interface ERC20 {
    function totalSupply() external view returns (uint256 _totalSupply);

    function balanceOf(address _owner) external view returns (uint256 balance);

    function transfer(address _to, uint256 _value)
        external
        returns (bool success);

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) external returns (bool success);

    function approve(address _spender, uint256 _value)
        external
        returns (bool success);

    function allowance(address _owner, address _spender)
        external
        view
        returns (uint256 remaining);

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );
}

//////Pancake
interface IPancakeFactory {
    event PairCreated(
        address indexed token0,
        address indexed token1,
        address pair,
        uint256
    );

    function feeTo() external view returns (address);

    function feeToSetter() external view returns (address);

    function getPair(address tokenA, address tokenB)
        external
        view
        returns (address pair);

    function allPairs(uint256) external view returns (address pair);

    function allPairsLength() external view returns (uint256);

    function createPair(address tokenA, address tokenB)
        external
        returns (address pair);

    function setFeeTo(address) external;

    function setFeeToSetter(address) external;
}

interface IPancakePair {
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
    event Transfer(address indexed from, address indexed to, uint256 value);

    function name() external pure returns (string memory);

    function symbol() external pure returns (string memory);

    function decimals() external pure returns (uint8);

    function totalSupply() external view returns (uint256);

    function balanceOf(address owner) external view returns (uint256);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function approve(address spender, uint256 value) external returns (bool);

    function transfer(address to, uint256 value) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool);

    function DOMAIN_SEPARATOR() external view returns (bytes32);

    function PERMIT_TYPEHASH() external pure returns (bytes32);

    function nonces(address owner) external view returns (uint256);

    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;

    event Mint(address indexed sender, uint256 amount0, uint256 amount1);
    event Burn(
        address indexed sender,
        uint256 amount0,
        uint256 amount1,
        address indexed to
    );
    event Swap(
        address indexed sender,
        uint256 amount0In,
        uint256 amount1In,
        uint256 amount0Out,
        uint256 amount1Out,
        address indexed to
    );
    event Sync(uint112 reserve0, uint112 reserve1);

    function MINIMUM_LIQUIDITY() external pure returns (uint256);

    function factory() external view returns (address);

    function token0() external view returns (address);

    function token1() external view returns (address);

    function getReserves()
        external
        view
        returns (
            uint112 reserve0,
            uint112 reserve1,
            uint32 blockTimestampLast
        );

    function price0CumulativeLast() external view returns (uint256);

    function price1CumulativeLast() external view returns (uint256);

    function kLast() external view returns (uint256);

    //   function mint(address to) external returns (uint liquidity);
    //   function burn(address to) external returns (uint amount0, uint amount1);
    function swap(
        uint256 amount0Out,
        uint256 amount1Out,
        address to,
        bytes calldata data
    ) external;

    //   function skim(address to) external;
    function sync() external;

    function initialize(address, address) external;
}

interface IPancakeRouter01 {
    function factory() external pure returns (address);

    function WETH() external pure returns (address);

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    )
        external
        returns (
            uint256 amountA,
            uint256 amountB,
            uint256 liquidity
        );

    function addLiquidityETH(
        address token,
        uint256 amountTokenDesired,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    )
        external
        payable
        returns (
            uint256 amountToken,
            uint256 amountETH,
            uint256 liquidity
        );

    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountA, uint256 amountB);

    function removeLiquidityETH(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountToken, uint256 amountETH);

    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (uint256 amountA, uint256 amountB);

    function removeLiquidityETHWithPermit(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (uint256 amountToken, uint256 amountETH);

    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapTokensForExactTokens(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapExactETHForTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable returns (uint256[] memory amounts);

    function swapTokensForExactETH(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapExactTokensForETH(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapETHForExactTokens(
        uint256 amountOut,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable returns (uint256[] memory amounts);

    function quote(
        uint256 amountA,
        uint256 reserveA,
        uint256 reserveB
    ) external pure returns (uint256 amountB);

    function getAmountOut(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut
    ) external pure returns (uint256 amountOut);

    function getAmountIn(
        uint256 amountOut,
        uint256 reserveIn,
        uint256 reserveOut
    ) external pure returns (uint256 amountIn);

    function getAmountsOut(uint256 amountIn, address[] calldata path)
        external
        view
        returns (uint256[] memory amounts);

    function getAmountsIn(uint256 amountOut, address[] calldata path)
        external
        view
        returns (uint256[] memory amounts);
}

interface IPancakeRouter02 is IPancakeRouter01 {
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountETH);

    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (uint256 amountETH);

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external;

    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable;

    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external;
}

// this is the basics of creating an ERC20 token
//change the name loeker to what ever you would like

contract LottoToken is VRFConsumerBase, ERC20 {
    string public constant symbol = "ETHLOTTO";
    string public constant name = "Ethernal Lottery Token";
    uint8 public constant decimals = 18;

    //TestNet
    //  address constant routerAddress=0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3;

    //MainNet
    address constant routerAddress = 0x10ED43C718714eb63d5aA57B78B54704E256024E;

    IPancakeRouter02 private _pancakeRouter = IPancakeRouter02(routerAddress);
    // address public _pancakePairAddress;

    address public MainWallet; //address of the wallet that controls the contract
    address public WorkHelperWallet; //address of the wallet used for automating tasks in the future. Has admin privelages

    address public TaxTokenContract =
        0x17Bd2E09fA4585c15749F40bb32a6e3dB58522bA; //ETHFIN
    address public TaxTokenDestination; //recipient of tax tokens
    address public LINKContract = 0x404460C6A5EdE2D891e8297795264fDe62ADBB75; // LINK mainnet

    bool public isPaused; //start stop trading

    modifier onlyMain() {
        require((msg.sender == MainWallet) || (msg.sender == WorkHelperWallet));
        _;
    }
    /* 
**Distribution:
o 3% of pot used to seed the next round
o 5% of pot gas 
o 2%  goes to liquidity fund
o 90% goes to the winner of the current round
*/
    //POTS
    uint256 public NextRoundPot;
    //  uint public ChainLinkPot;
    uint256 public GasPot;
    uint256 public LiquidityPot;
    uint256 public burnRate = 10; //percentage of transfer tax to burn < 100%

    //Lottery related variables
    mapping(uint256 => address) private entries;
    uint64 public RoundEntries;
    uint64 public RoundNr;
    uint64 public Minimum_Entries = 50;
    uint64 public MaxEntriessperTransaction = 30;
    uint256 public Tax;
    // uint256 public TaxPot;
    uint256 public CurrentJackpot;
    uint256 public TotalPaidOutVal;
    // uint256 public AverageJackpotVal;
    uint256 public TicketPrice = 100 * 10**decimals;
    uint256 public NextRoundTicketPrice = TicketPrice;
    uint256 public RoundDuration = 3600;
    uint256 public StartTime;
    uint256 public initialSupply;

    uint256 public SwapThreshold = TicketPrice / 5;
    uint256 public percGastoSwap = 20;

    //VRF variables
    bool public usingChainLinkVRF;
    bytes32 private keyHash;
    uint256 public LINK_fee;

    struct Results {
        uint256 WinningNumber;
        address WinningAddress;
        uint256 payoutVal;
        uint256 EndTime;
    }
    /////////////////

    Results[] public ResultsLog;

    //1,000,000+18 zeros
    uint256 private __totalSupply = 1000000000000000000000000; //1 million tokens

    //this mapping is where we store the balances of an address
    mapping(address => uint256) private __balanceOf;
    mapping(address => uint256) private NumberofEntries;
    mapping(address => uint256) private LatestRoundEntered;

    event LotteryWon(address winner, uint256 amount);

    //This is a mapping of a mapping.  This is for the approval function to determine how much an address can spend
    mapping(address => mapping(address => uint256)) private __allowances;

    mapping(address => bool) public _ExcludedFromTax;

    //the creator of the contract has the total supply and no one can create tokens
    constructor()
        VRFConsumerBase(
            //   0xa555fC018435bef5A13C6c6870a9d4C11DEC329C, // VRF Coordinator Testnet
            //   0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06  // LINK Token Testnet
            0x747973a5A2a4Ae1D3a8fDF5479f1514F65Db9C31, // VRF Coordinator Mainnet
            0x404460C6A5EdE2D891e8297795264fDe62ADBB75 // LINK Token Mainnet
        )
    {
        keyHash = keyHash = 0xc251acd21ec4fb7f31bb8868288bfdbaeb4fbfec2df3735ddbd4f7dc8d60103c; //0xcaf3c3727e033261d383b315559476f48034c13b18f8cafed4d871abe5049186; //TestNet //MainNet
        LINK_fee = 0.2 * 10**18; // 0.2 LINK
        usingChainLinkVRF = true;

        __balanceOf[msg.sender] = __totalSupply;
        initialSupply = __totalSupply;
        _ExcludedFromTax[address(this)] = true;
        _ExcludedFromTax[msg.sender] = true;

        // _pancakePairAddress = IPancakeFactory(_pancakeRouter.factory()).createPair(address(this), LiqPairContract);

        MainWallet = msg.sender;
        WorkHelperWallet = msg.sender;
        TaxTokenDestination = MainWallet;
        StartTime = block.timestamp;
    }

    //constant value that does not change/  returns the amount of initial tokens to display
    function totalSupply() public view override returns (uint256 _totalSupply) {
        _totalSupply = __totalSupply;
    }

    //returns the balance of a specific address
    function balanceOf(address _addr)
        public
        view
        override
        returns (uint256 balance)
    {
        return __balanceOf[_addr];
    }

    //transfer an amount of tokens to another address.  The transfer needs to be >0
    //does the msg.sender have enough tokens to forfill the transfer
    //decrease the balance of the sender and increase the balance of the to address
    function transfer(address _to, uint256 _value)
        public
        override
        returns (bool success)
    {
        uint256 taxamount;

        if ((_ExcludedFromTax[_to]) || (_ExcludedFromTax[msg.sender]))
            taxamount = 0;
        else taxamount = (_value * Tax) / 100;

        uint256 amountout = _value - taxamount;
        if (isPaused) {
            require(
                (_ExcludedFromTax[_to]) || (_ExcludedFromTax[msg.sender]),
                "Trading Paused"
            );
        }
        if (_value > 0 && _value <= balanceOf(msg.sender)) {
            __balanceOf[msg.sender] -= _value;
            __balanceOf[_to] += amountout;
            emit Transfer(msg.sender, _to, amountout);

            uint256 burnPortion = (taxamount * burnRate) / 100;
            GasPot += taxamount - burnPortion;
            __totalSupply -= burnPortion;
            return true;
        }
        return false;
    }

    //this allows someone else (a 3rd party) to transfer from my wallet to someone elses wallet
    //If the 3rd party has an allowance of >0
    //and the value to transfer is >0
    //and the allowance is >= the value of the transfer
    //and it is not a contract
    //perform the transfer by increasing the to account and decreasing the from accounts
    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public override returns (bool success) {
        uint256 taxamount;

        if ((_ExcludedFromTax[_to]) || (_ExcludedFromTax[_from])) taxamount = 0;
        else taxamount = (_value * Tax) / 100;

        uint256 amountout = _value - taxamount;

        if (isPaused) {
            require(
                (_ExcludedFromTax[_to]) || (_ExcludedFromTax[_from]),
                "Trading Paused"
            );
        }

        if (
            __allowances[_from][msg.sender] > 0 &&
            _value > 0 &&
            __allowances[_from][msg.sender] >= _value
        ) {
            __balanceOf[_from] -= _value;
            __balanceOf[_to] += amountout;
            emit Transfer(_from, _to, amountout);

            uint256 burnPortion = (taxamount * burnRate) / 100;
            GasPot += taxamount - burnPortion;
            __totalSupply -= burnPortion;
            return true;
        }
        return false;
    }

    //This check is to determine if we are sending to a contract?
    //Is there code at this address?  If the code size is greater then 0 then it is a contract.
    function isContract(address _addr) public view returns (bool) {
        uint256 codeSize;
        //in line assembly code
        assembly {
            codeSize := extcodesize(_addr)
        }
        // i=s code size > 0  then true
        return codeSize > 0;
    }

    //allows a spender address to spend a specific amount of value
    function approve(address _spender, uint256 _value)
        external
        override
        returns (bool success)
    {
        __allowances[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    //shows how much a spender has the approval to spend to a specific address
    function allowance(address _owner, address _spender)
        external
        view
        override
        returns (uint256 remaining)
    {
        return __allowances[_owner][_spender];
    }

    function _approveMore(
        address _owner,
        address _spender,
        uint256 _value
    ) internal returns (bool success) {
        uint256 old = __allowances[_owner][_spender];
        __allowances[_owner][_spender] += _value;
        emit Approval(_owner, _spender, old + _value);
        return true;
    }

    receive() external payable {} // fallback to receive bnb

    function ReservesBNB() public view returns (uint256) {
        return address(this).balance;
    }

    function ReservesToken() public view returns (uint256) {
        return __balanceOf[address(this)];
    }

    //Lottery functions
    function EnterDraw(uint32 NumberofTickets) public {
        address entrant = msg.sender;
        uint256 cost = NumberofTickets * TicketPrice;

        require(__balanceOf[entrant] >= cost, "Insufficient Balance");

        __balanceOf[entrant] -= cost;

        //keep track of number of entries
        if (LatestRoundEntered[entrant] < RoundNr) //first entry this round
        {
            LatestRoundEntered[entrant] = RoundNr;
            NumberofEntries[entrant] = NumberofTickets;
        } else NumberofEntries[entrant] += NumberofTickets; //add to number of entries for this round

        /**Distribution:
All tax is sent to owner for maximum customizability.

o 3% of pot used to seed the next round
o 5% of pot gas - paid out to owner and portion swapped for ETHFIN which is also paid out
o 2%  Lotto tokens sent to owner for use in giveaways, locking, liquidity
o 90% goes to the winner of the current round

Transfer tax - 0-20% added to gas pot.
*/

        NextRoundPot += (cost * 3) / 100;
        // ChainLinkPot += cost * 2 / 100;
        // GasPot += cost * 3 / 100;
        GasPot += (cost * 5) / 100; //combination of chainlink and gas
        LiquidityPot += (cost * 2) / 100; //tokens for liquidity
        CurrentJackpot += (cost * 90) / 100;

        // _balances[address(this)] += cost;

        for (uint32 i = 0; i < NumberofTickets; i++) {
            entries[RoundEntries] = entrant;
            RoundEntries++;
        }
        if ((RoundEntries >= Minimum_Entries) && (getSecondsRemaining() == 0)) {
            if (usingChainLinkVRF)
                if (
                    randomRequestedFlag == false
                ) //avoid calling function multiple times
                {
                    getRandomNumberLINK();
                } else FinalizeRound();
        } else doWork();
    }

    function getSecondsRemaining() public view returns (uint256 Seconds) {
        uint256 currentTime = block.timestamp;
        if (currentTime < StartTime + RoundDuration)
            return StartTime + RoundDuration - currentTime;
        else return 0;
    }

    function getMyEntries() public view returns (uint256) {
        if (LatestRoundEntered[msg.sender] == RoundNr)
            return NumberofEntries[msg.sender];
        else return 0;
    }

    function getLINKBalance() public view returns (uint256) {
        return LINK.balanceOf(address(this));
    }

    function getMyWinningOdds10000() public view returns (uint256) {
        if (RoundEntries > 0) {
            return (getMyEntries() * 10000) / RoundEntries;
        } else return 0;
    }

    function getCountDown()
        public
        view
        returns (
            uint256 Days,
            uint256 Hours,
            uint256 Minutes,
            uint256 Seconds
        )
    {
        uint256 currentTime = block.timestamp;

        if (currentTime < StartTime + RoundDuration) {
            uint256 RemainingTime = StartTime + RoundDuration - currentTime;
            Days = RemainingTime / 86400;
            Hours = RemainingTime / 3600 - Days * 24;
            Minutes = RemainingTime / 60 - (Hours + Days * 24) * 60;
            Seconds =
                RemainingTime -
                (Days * 86400) -
                (Hours * 3600) -
                (Minutes * 60);
        } else {
            Days = 0;
            Hours = 0;
            Minutes = 0;
            Seconds = 0;
        }

        return (Days, Hours, Minutes, Seconds);
    }

    function setTokenTax(uint256 TransferTax) public onlyMain {
        require(TransferTax <= 20);
        Tax = TransferTax;
    }

    function setBurnRate(uint256 newBurnRate) public onlyMain {
        require(newBurnRate < 100); //proportion of transfer tax that gets burned
        burnRate = newBurnRate;
    }

    function addTokenstoJackpot(uint256 tokens) public onlyMain {
        require(tokens <= __balanceOf[address(this)]); //function to add tokens from contract to jackpot
        __balanceOf[address(this)] -= tokens;
        CurrentJackpot += tokens;
    }

    function ExcludefromTax(address Addr) public onlyMain {
        _ExcludedFromTax[Addr] = true;
    }

    function UndoExcludefromTax(address Addr) public onlyMain {
        _ExcludedFromTax[Addr] = false;
    }

    function setTaxTokenContract(address Contract) public onlyMain {
        TaxTokenContract = Contract;
    }

    function setPercGasToSwap(uint256 perctoswap) public onlyMain {
        require(perctoswap < 100);
        percGastoSwap = perctoswap;
    }

    function setLINKfee(uint256 fee) public onlyMain {
        LINK_fee = fee;
    }

    function setTaxTokenDestination(address Contract) public onlyMain {
        TaxTokenDestination = Contract;
    }

    function setMainWallet(address Wallet) public onlyMain {
        MainWallet = Wallet;
    }

    function setHelperContract(address Wallet) public onlyMain {
        WorkHelperWallet = Wallet;
    }

    function ChainlinkEnabled(bool isEnabled) public onlyMain {
        usingChainLinkVRF = isEnabled;
    }

    //add liquidity + add buy ETHFIN -> send to contract. Add setup functions add function for token tax
    function doWork() public {
        //Swap tokens for BNB

        if (GasPot >= SwapThreshold) {
            uint256 temp = GasPot;
            GasPot = 0;
            __balanceOf[address(this)] += temp;

            if (_swapTokenForBNB(temp) == 0) {
                //revert if swap failed
                __balanceOf[address(this)] -= temp;
                GasPot += temp;
            }
        }
        //Send tokens and bnb
        {
            uint256 amountBNB = address(this).balance; //send bnb
            if (amountBNB > 10000) //0.1BNB change back
            {
                if (percGastoSwap > 0) //swap a portion to chosen token
                {
                    uint256 amounttoSwap = (amountBNB * percGastoSwap) / 100;
                    _swapBNBforChosenTokenandPayout(
                        amounttoSwap,
                        TaxTokenContract,
                        TaxTokenDestination
                    );
                    amountBNB -= amounttoSwap;
                }
                (bool success, ) = WorkHelperWallet.call{value: amountBNB}(
                    new bytes(0)
                );
                uint256 amountTokens = LiquidityPot;
                LiquidityPot = 0; //send tokens
                __balanceOf[WorkHelperWallet] += amountTokens;
            }
        }
    }

    function FinalizeRound() internal returns (bool) {
        if (RoundEntries > 0) {
            uint256 currentTime = block.timestamp;
            uint256 Num = getRandomNumber(RoundEntries);
            address Winner = entries[Num];

            ResultsLog.push(
                Results(Num, Winner, CurrentJackpot, StartTime + RoundDuration)
            );
            //   ResultsLog[RoundNr].WinningNumber = Num;
            //   ResultsLog[RoundNr].WinningAddress = Winner;
            //   ResultsLog[RoundNr].payoutVal = CurrentJackpot;
            //   ResultsLog[RoundNr].EndTime = StartTime+RoundDuration;

            StartTime = currentTime;

            //checks if price has been changed
            TicketPrice = NextRoundTicketPrice;
            //do payouts
            uint256 temp = CurrentJackpot;
            CurrentJackpot = NextRoundPot; //feed next round pot into new jackpot
            NextRoundPot = 0;

            transfer(Winner, temp);
            emit LotteryWon(Winner, temp);
            RoundNr++;
            RoundEntries = 0;
            TotalPaidOutVal += temp;
            return true;
        } else return false;
    }

    function _swapTokenForToken(
        address TokenOut,
        uint256 tokenInAmount,
        address Recipient
    ) private returns (uint256) {
        if (tokenInAmount > 0) {
            _approveMore(address(this), address(_pancakeRouter), tokenInAmount);

            address[] memory path = new address[](2);
            path[0] = address(this);
            path[1] = TokenOut;

            (bool success, bytes memory data) = routerAddress.call(
                abi.encodeWithSelector(
                    0x5c11d795, //"5c11d795": "swapExactTokensForTokensSupportingFeeOnTransferTokens(uint256,uint256,address[],address,uint256)",
                    tokenInAmount,
                    0,
                    path,
                    Recipient,
                    block.timestamp + 20
                )
            );

            if (success) {
                uint256[] memory amounts = abi.decode(data, (uint256[]));
                if (amounts.length >= 2) return amounts[1];
            }
        }

        return 0;
    }

    function _swapTokenForBNB(uint256 tokenamount) private returns (uint256) {
        if (tokenamount > 0) {
            _approveMore(address(this), address(_pancakeRouter), tokenamount);

            address[] memory path = new address[](2);
            path[0] = address(this);
            path[1] = _pancakeRouter.WETH();

            (bool success, bytes memory data) = routerAddress.call(
                abi.encodeWithSelector(
                    0x18cbafe5,
                    tokenamount,
                    0,
                    path,
                    address(this),
                    block.timestamp + 20
                )
            );

            if (success) {
                uint256[] memory amounts = abi.decode(data, (uint256[]));

                if (amounts.length >= 2) return amounts[1];
            }
        }
        return 0;
    }

    //works for receiver != address(this)
    function _swapBNBforChosenTokenandPayout(
        uint256 amountBNB,
        address PayoutTokenContract,
        address receiver
    ) private returns (bool) {
        address[] memory path = new address[](2);
        path[0] = _pancakeRouter.WETH();
        path[1] = PayoutTokenContract;

        try
            _pancakeRouter.swapExactETHForTokensSupportingFeeOnTransferTokens{
                value: amountBNB
            }(0, path, address(receiver), block.timestamp + 20)
        {
            return true;
        } catch {}

        return false;
    }

    function SetMinEntriesperRound(uint64 New_Minimum_Entries) public onlyMain {
        Minimum_Entries = New_Minimum_Entries;
    }

    function SetRoundDuration(uint256 Hours) public onlyMain {
        RoundDuration = Hours * 3600;
    }

    function SetMaxEntriesperTransaction(uint64 NewMaxEntriessperTransaction)
        public
        onlyMain
    {
        MaxEntriessperTransaction = NewMaxEntriessperTransaction;
    }

    function SetTicketPrice(uint256 NewPrice) public onlyMain {
        require(NewPrice <= __totalSupply / (100 * 10**decimals)); //Max 1% per ticket to avoid mistakes
        NextRoundTicketPrice = NewPrice * 10**decimals;
    }

    function ForceEndRound(uint256 key) public onlyMain {
        if (key == 123) //check to make sure you want to force the round to end
        {
            if (usingChainLinkVRF) getRandomNumberLINK();
            else FinalizeRound();
        }
    }

    function PauseTrading() public onlyMain {
        isPaused = true;
    }

    function StartTrading() public onlyMain {
        isPaused = false;
    }

    uint256 nonce = 1;

    function getRandomNumber(uint256 range) internal returns (uint256) {
        uint256 randomnumber;

        uint256 seed = nonce + randomOutput + CurrentJackpot;
        randomnumber =
            uint256(
                keccak256(abi.encodePacked(block.timestamp, msg.sender, seed))
            ) %
            range;
        nonce++;

        return randomnumber;
    }

    function getTokenprice(uint256 amountBNB) public view returns (uint256) {
        address[] memory path = new address[](2);
        path[0] = _pancakeRouter.WETH();
        path[1] = address(this);
        uint256[] memory amounts = _pancakeRouter.getAmountsOut(
            amountBNB,
            path
        );

        return amounts[1];
    }

    bytes32 public requestIdOutput;
    uint256 public randomOutput;
    bool randomRequestedFlag;

    function getRandomNumberLINK() private {
        require(
            LINK.balanceOf(address(this)) > LINK_fee,
            "Not enough LINK - fill contract with faucet"
        );
        requestIdOutput = requestRandomness(keyHash, LINK_fee);
        randomRequestedFlag = true;
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness)
        internal
        override
    {
        uint256 Value = randomness;
        randomOutput = Value;

        FinalizeRound();
        randomRequestedFlag = false;
    }
}
