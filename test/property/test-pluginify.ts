import { testProp, fc } from 'ava-fast-check'

import { pluginify } from '../../src/index'

testProp.skip(
    'TODO: property-test pluginify',
    [
        // arbitraries
        fc.nat(),
    ],
    (
        t,
        // test arguments
        natural,
    ) => {
        // ava test here
    },
    {
        verbose: true,
    },
)
