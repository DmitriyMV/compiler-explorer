// Copyright (c) 2021, Compiler Explorer Authors
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright notice,
//       this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

import { LanguageDefinitionProducer, LanguageDefinition } from './modes.interfaces';

/**
 * Helper function for creating a language mode which extends a different
 * language mode.
 *
 * This is a higher order function returning a lambda which will create create
 * the new mode.
 *
 * Warning: this function does not do deep copies, so do not modify properties
 * on the base parameter in the callback, do local copies there.
 *
 * Example usage for extending the Cppp mode looks like this:
 *
 * ```ts
 * export interface FooModeProps extends CpppModeProps {}
 * export const createFooMode: LanguageDefinitionProducer<FooModeProps> =
 *   createLanguageMode(createCpppMode, (cppp) => ({
 *     ...cppp,
 *     keywords: ['some', 'overridden', 'keywords'],
 *   }));
 * ```
 */
export const createLanguageMode = <S, T>(
    base: LanguageDefinitionProducer<T>,
    producer: (base: LanguageDefinition<T>) => LanguageDefinition<S & T>
): LanguageDefinitionProducer<T & S> => () => producer(base());