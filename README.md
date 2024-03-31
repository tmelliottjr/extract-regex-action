# Extract Regex Action

This action extracts a regex pattern from an input string and outputs it as an environment variable.

## Example

```yaml
- name: Extract status from comment
  uses: tmelliottjr/extract-regex-action@<version #>
  id: status
  with:
    regex: '(?<=### Status\s).*?(?=\s*###)'
    flags: "sgm"
    input: ${{ github.event.comment.body }}
```

## Inputs

| Field   | Description                       | Type     |
| ------- | --------------------------------- | -------- |
| `regex` | The regex pattern to extract.     | `string` |
| `flags` | The regex flags to use.           | `string` |
| `input` | The input string to extract from. | `string` |

## Outputs

### `resultString`

The result of the regex match as a string.

i.e. `"👍 -> 👎 🟢 -> 🔴"`

### `resultArray`

The result of the regex match as a JSON array.

i.e. `["👍 -> 👎", "🟢 -> 🔴"]`
