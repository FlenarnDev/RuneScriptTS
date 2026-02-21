<div align="center">
<h1>RuneScriptTS</h1>
</div>

This is a **RuneScript Compiler**, written in TypeScript. Our focus is to preserve RS2 history as accurately and authentically as we can.

### Installation and Usage

`npm i @lostcityrs/runescript`  
(or yarn, bun, pnpm...)

```ts
import { CompileServerScript } from '@lostcityrs/runescript';

CompileServerScript();
```

The compiler expects a couple things to be in place.

1. A source folder that contains `.rs2` scripts.
2. ".sym" files containing ID->name maps in tsv-format (tab-separated values):
```tsv
0	p11_full
1	p12_full
2	b12_full
3	q8_full
```
There must be a sym file for every config type you reference in your scripts.

By default it will read scripts from `../content/scripts` and symbols from `./data/symbols`.  
After it runs, compiled output will be placed in `./data/pack/server`.

See [LostCityRS/Server](https://github.com/LostCityRS/Server) for a working example of everything if you aren't using that already.

### History

Originally a fork of [Neptune](https://github.com/neptune-ps/neptune)'s script compiler.  
Our initial compiler fork (2023-2026) focused instead on making a complete server script compiler, along with a script runtime and world simulation:  
https://github.com/LostCityRS/RuneScriptKt  
https://github.com/LostCityRS/Engine-TS

As of February 2026 we have transitioned from the "legacy" Kotlin codebase to this TypeScript codebase (clean port).  
Consumers should use this. It is production-ready and produces compatible output along with some bug fixes.

### Credits

Polar: For your years of work on Neptune and many days brainstorming together.  
Flenarn: For your effort porting so much Kotlin code to TypeScript. There were only a few lines to fix afterwards - great job.  
Contributions in RuneScriptKt: Henke96 [PR #1](https://github.com/LostCityRS/RuneScriptKt/pull/1) and Bea5 [PR #2](https://github.com/LostCityRS/RuneScriptKt/pull/1).
