# Gadget 配置

每个 Gadget 在 `src/gadgets/<Name>/` 目录下拥有一个 `definition.yaml` 文件，声明其 ResourceLoader 配置。构建脚本 `scripts/build/definition.ts` 读取这些配置，生成 `MediaWiki:Gadgets-definition` 页面和各语言描述文件。

## 字段参考

### `ResourceLoader`

始终为 `true`。标识通过 MediaWiki ResourceLoader 加载，不使用传统 `<script>` 标签。

### `hidden`

| 值      | 含义                                                   |
| ------- | ------------------------------------------------------ |
| `false` | 在 Special:Gadgets 中显示，用户可在偏好设置中启用/禁用 |
| `true`  | 完全隐藏，适用于库代码和内部工具                       |

### `default`

| 值      | 含义                                           |
| ------- | ---------------------------------------------- |
| `true`  | 默认对所有用户启用，用户可在偏好设置中选择关闭 |
| `false` | 用户需手动在偏好设置中启用                     |

### `type`

| 值        | 含义                                 |
| --------- | ------------------------------------ |
| `general` | 可包含 JavaScript 和 CSS             |
| `styles`  | 仅包含 CSS，加载更快且不阻塞 JS 执行 |

### `rights`

用户权限要求。数组格式，示例：

```yaml
rights:
    - edit
    - editinterface
```

仅拥有全部所列权限的用户可加载此 Gadget。

### `namespaces`

限制 Gadget 生效的 MediaWiki 命名空间 ID。空列表表示所有命名空间。

```yaml
namespaces:
    - 8 # MediaWiki 命名空间
```

### `contentModels`

限制 Gadget 生效的内容模型。

```yaml
contentModels:
    - wikitext
```

### `actions`

限制 Gadget 生效的页面操作类型。

```yaml
actions:
    - view
```

### `dependencies`

ResourceLoader 模块依赖。构建时会自动加载这些模块。

```yaml
dependencies:
    - mediawiki.api
    - oojs-ui
    - ext.gadget.site-lib
```

**注意**：`ext.gadget.<name>` 格式引用的是其他 Gadget 暴露的模块，必须确保被依赖的 Gadget 已启用。

### `files`

编译后的输出文件列表。文件名保留 `Gadget-` 前缀，构建时会自动去除该前缀生成定义。

```yaml
files:
    - Gadget-<Name>.js
```

### `enable`

控制该 Gadget 定义是否激活：

- `true`：定义写入最终的 Gadgets-definition，Gadget 可用
- `false`：定义存在但被禁用，不写入 Gadgets-definition

### `description`

Gadget 的描述文本，支持 HTML：

```yaml
description: <描述文本> <small><子描述></small>
```

## 配置示例

### 仅 CSS（styles 类型）

```yaml
ResourceLoader: true
hidden: false
default: false
type: styles
files:
    - Gadget-<Name>.css
description: <描述文本>
```

### 带权限和依赖的工具

```yaml
ResourceLoader: true
hidden: false
default: false
type: general
rights:
    - edit
    - editinterface
namespaces:
    - 8
contentModels:
    - wikitext
dependencies:
    - mediawiki.api
    - oojs-ui
files:
    - Gadget-<Name>.js
description: <描述文本>
```

### 隐藏库（hidden）

```yaml
ResourceLoader: true
hidden: true
default: false
type: general
dependencies:
    - ext.gadget.<dependency>
files:
    - Gadget-<Name>.js
description: <描述文本>
```

## 文件命名规范

- 源文件：`Gadget-<Name>.ts` / `.js` / `.scss` / `.css`
- 定义文件：`definition.yaml`
- `Gadgets-definition-list.yaml` 中引用的名称不含 `Gadget-` 前缀，仅使用 `<Name>`
- 构建产物输出至 `dist/gadgets/<Name>/`，`Gadget-` 前缀保留在文件名中，但定义行中会被去除
