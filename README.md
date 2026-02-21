<div align="center">
<h1>RuneScriptTS</h1>
</div>

This started as a fork of [Neptune](https://github.com/neptune-ps/neptune)'s script compiler with different goals.  
We only want to preserve RS2 history as accurately and authentically as we can.

Our initial compiler fork (2023-2026) focused instead on making a complete server script compiler, along with a script runtime and world simulation:  
https://github.com/LostCityRS/RuneScriptKt  
https://github.com/LostCityRS/Engine-TS

As of February 2026 we have transitioned from the "legacy" Kotlin codebase to this TypeScript codebase (clean port).  
Consumers should use this. It is production-ready and produces compatible output along with some bug fixes.

### Credits

Polar: For your years of work on Neptune and many days helping brainstorm.  
Flenarn: For your effort porting all the Kotlin code to TypeScript. There were only a few lines to fix afterwards - great job.  
Contributions in RuneScriptKt: Henke96 [PR #1](https://github.com/LostCityRS/RuneScriptKt/pull/1) and Bea5 [PR #2](https://github.com/LostCityRS/RuneScriptKt/pull/1).
