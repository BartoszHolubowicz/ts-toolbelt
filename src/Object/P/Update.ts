import {IterationOf} from '../../Iteration/IterationOf'
import {Iteration} from '../../Iteration/Iteration'
import {Pos} from '../../Iteration/Pos'
import {Next} from '../../Iteration/Next'
import {Path as PPath} from './_Internal'
import {Index} from '../../Any/Index'
import {Update as OUpdate} from '../Update'
import {LastIndex} from '../../Tuple/LastIndex'
import {Tuple} from '../../Tuple/Tuple'
import {Key} from '../../Iteration/Key'

type _Update<O, Path extends Tuple<Index>, A, I extends Iteration = IterationOf<'0'>> =
  O extends object                            // If it's an object
  ? Key<I> extends LastIndex<Path, 's'>       // If it's the last index
    ? OUpdate<O, Path[Pos<I>], A>             // Use standard Update
    : {
        [K in keyof O]:
          K extends Path[Pos<I>]              // If K is part of Path
            ? _Update<O[K], Path, A, Next<I>> // Continue diving
            : O[K]                            // Not part of path - x
      } & {}
  : O                                         // Not an object - x

/** Update in **`O`** the fields at **`Path`** with **`A`**
 * (⚠️ this type is expensive)
 * @param O to update
 * @param Path to be followed
 * @param A to update with
 * @returns **`object`**
 * @example
 * ```ts
 * ```
 */
export type Update<O extends object, Path extends PPath, A extends any> =
    _Update<O, Path, A>
