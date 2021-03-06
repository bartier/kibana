<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [ConfigDeprecationFactory](./kibana-plugin-core-server.configdeprecationfactory.md) &gt; [renameFromRoot](./kibana-plugin-core-server.configdeprecationfactory.renamefromroot.md)

## ConfigDeprecationFactory.renameFromRoot() method

Rename a configuration property from the root configuration. Will log a deprecation warning if the oldKey was found and deprecation applied.

This should be only used when renaming properties from different configuration's path. To rename properties from inside a plugin's configuration, use 'rename' instead.

<b>Signature:</b>

```typescript
renameFromRoot(oldKey: string, newKey: string, silent?: boolean): ConfigDeprecation;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  oldKey | <code>string</code> |  |
|  newKey | <code>string</code> |  |
|  silent | <code>boolean</code> |  |

<b>Returns:</b>

`ConfigDeprecation`

## Example

Rename 'oldplugin.key' to 'newplugin.key'

```typescript
const provider: ConfigDeprecationProvider = ({ renameFromRoot }) => [
  renameFromRoot('oldplugin.key', 'newplugin.key'),
]

```

