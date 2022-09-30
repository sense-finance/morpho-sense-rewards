export default [
  {
    inputs: [
      {
        internalType: "address",
        name: "_cup",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenHandler",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AlreadySettled",
    type: "error",
  },
  {
    inputs: [],
    name: "CollectNotSettled",
    type: "error",
  },
  {
    inputs: [],
    name: "CombineRestricted",
    type: "error",
  },
  {
    inputs: [],
    name: "DuplicateSeries",
    type: "error",
  },
  {
    inputs: [],
    name: "ExistingValue",
    type: "error",
  },
  {
    inputs: [],
    name: "GuardCapReached",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidAdapter",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidMaturity",
    type: "error",
  },
  {
    inputs: [],
    name: "IssuanceFeeCapExceeded",
    type: "error",
  },
  {
    inputs: [],
    name: "IssuanceRestricted",
    type: "error",
  },
  {
    inputs: [],
    name: "IssueOnSettle",
    type: "error",
  },
  {
    inputs: [],
    name: "NotSettled",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyPeriphery",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyPermissionless",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyYT",
    type: "error",
  },
  {
    inputs: [],
    name: "OutOfWindowBoundaries",
    type: "error",
  },
  {
    inputs: [],
    name: "RedeemRestricted",
    type: "error",
  },
  {
    inputs: [],
    name: "SeriesDoesNotExist",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "adapter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "isOn",
        type: "bool",
      },
    ],
    name: "AdapterChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "adapter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "maturity",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "mscale",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "_usrs",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "_lscales",
        type: "uint256[]",
      },
    ],
    name: "Backfilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "adapter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "maturity",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "collected",
        type: "uint256",
      },
    ],
    name: "Collected",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "adapter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "maturity",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "Combined",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "adapter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "cap",
        type: "uint256",
      },
    ],
    name: "GuardChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bool",
        name: "guarded",
        type: "bool",
      },
    ],
    name: "GuardedChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "adapter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "maturity",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "Issued",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "adapter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "maturity",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "redeemed",
        type: "uint256",
      },
    ],
    name: "PTRedeemed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "periphery",
        type: "address",
      },
    ],
    name: "PeripheryChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bool",
        name: "permissionless",
        type: "bool",
      },
    ],
    name: "PermissionlessChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "adapter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "maturity",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "pt",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "yt",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sponsor",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "SeriesInitialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "adapter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "maturity",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "settler",
        type: "address",
      },
    ],
    name: "SeriesSettled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "trusted",
        type: "bool",
      },
    ],
    name: "UserTrustUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "adapter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "maturity",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "redeemed",
        type: "uint256",
      },
    ],
    name: "YTRedeemed",
    type: "event",
  },
  {
    inputs: [],
    name: "ISSUANCE_FEE_CAP",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SETTLEMENT_WINDOW",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SPONSOR_WINDOW",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "adapterAddresses",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "adapterCounter",
    outputs: [
      {
        internalType: "uint248",
        name: "",
        type: "uint248",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "adapterMeta",
    outputs: [
      {
        internalType: "uint248",
        name: "id",
        type: "uint248",
      },
      {
        internalType: "bool",
        name: "enabled",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "guard",
        type: "uint256",
      },
      {
        internalType: "uint248",
        name: "level",
        type: "uint248",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "adapter",
        type: "address",
      },
    ],
    name: "addAdapter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "adapter",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "maturity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "mscale",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_usrs",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_lscales",
        type: "uint256[]",
      },
    ],
    name: "backfillScale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        internalType: "address",
        name: "adapter",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "maturity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "uBalTransfer",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "collect",
    outputs: [
      {
        internalType: "uint256",
        name: "collected",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "adapter",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "maturity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "uBal",
        type: "uint256",
      },
    ],
    name: "combine",
    outputs: [
      {
        internalType: "uint256",
        name: "tBal",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "cup",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "guarded",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "adapter",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "maturity",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "sponsor",
        type: "address",
      },
    ],
    name: "initSeries",
    outputs: [
      {
        internalType: "address",
        name: "pt",
        type: "address",
      },
      {
        internalType: "address",
        name: "yt",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isTrusted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "adapter",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "maturity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tBal",
        type: "uint256",
      },
    ],
    name: "issue",
    outputs: [
      {
        internalType: "uint256",
        name: "uBal",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lscales",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "adapter",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "maturity",
        type: "uint256",
      },
    ],
    name: "mscale",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "periphery",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "permissionless",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "adapter",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "maturity",
        type: "uint256",
      },
    ],
    name: "pt",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "adapter",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "maturity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "uBal",
        type: "uint256",
      },
    ],
    name: "redeem",
    outputs: [
      {
        internalType: "uint256",
        name: "tBal",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "series",
    outputs: [
      {
        internalType: "address",
        name: "pt",
        type: "address",
      },
      {
        internalType: "uint48",
        name: "issuance",
        type: "uint48",
      },
      {
        internalType: "address",
        name: "yt",
        type: "address",
      },
      {
        internalType: "uint96",
        name: "tilt",
        type: "uint96",
      },
      {
        internalType: "address",
        name: "sponsor",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "iscale",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "mscale",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxscale",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "adapter",
        type: "address",
      },
      {
        internalType: "bool",
        name: "isOn",
        type: "bool",
      },
    ],
    name: "setAdapter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "adapter",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "cap",
        type: "uint256",
      },
    ],
    name: "setGuard",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_guarded",
        type: "bool",
      },
    ],
    name: "setGuarded",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "bool",
        name: "trusted",
        type: "bool",
      },
    ],
    name: "setIsTrusted",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_paused",
        type: "bool",
      },
    ],
    name: "setPaused",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_periphery",
        type: "address",
      },
    ],
    name: "setPeriphery",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_permissionless",
        type: "bool",
      },
    ],
    name: "setPermissionless",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "adapter",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "maturity",
        type: "uint256",
      },
    ],
    name: "settleSeries",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenHandler",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "adapter",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "maturity",
        type: "uint256",
      },
    ],
    name: "yt",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
