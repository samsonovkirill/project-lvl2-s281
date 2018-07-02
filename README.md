# Gendiff
<a href="https://codeclimate.com/github/samsonovkirill/project-lvl2-s281/maintainability">
  <img src="https://api.codeclimate.com/v1/badges/f2e356fd4daf38dca2d6/maintainability" />
</a>
<a href="https://travis-ci.org/samsonovkirill/project-lvl2-s281">
  <img src="https://travis-ci.org/samsonovkirill/project-lvl2-s281.svg?branch=master" />
</a>

## About project
Gendiff is a CLI utility compares two configuration files and shows a difference.
## Installation
To globally install use `npm i gendiff-package -g`

## Usage
Use `gendiff --help` to show help page
```
Usage: gendiff [options] <firstConfig> <secondConfig>

Compares two configuration files and shows a difference.

Options:

  -V, --version        output the version number
  -f, --format [type]  output format
  -h, --help           output usage information
```

## Examples

```
kirill$ gendiff before.json after.json
{
   host: localhost
   proxy: 123.234.53.22
   follow: false
   port: 80
   config: {
      backup: none
    - auto: yes
    + configuration: {
         param: value
      }
   }
}
```

```
kirill$ gendiff before.json after.json --format plain
Property 'config.auto' was removed
Property 'config.configuration' was added with complex value
```

### Options

Gendiff supports different output formats:
* tree (default)
* plain
* JSON

Use -f flag to set required output format.
`-f, --format [type]  output format`

### Output formats description

#### Tree
Tree output format is a hierarchical tree. Affected key:value pairs are marked by '+' or '-' means option was added or deleted from resulting file. If value was modified it represents two rows with '+' new value and '-' old value. Unmodified pairs displays as is.

**Examples**

before.json
```
{
  "host": "localhost",
  "proxy": "123.234.53.22",
  "follow": false,
  "port": 80,
  "config": {
      "backup": "none",
      "auto": "yes"
  }
}
```
after.json
```
{
  "host": "localhost",
  "proxy": "123.234.53.22",
  "follow": false,
  "port": 80,
  "config": {
      "backup": "none",
      "configuration": {
        "param": "value"
      }
  }
}
```
result
```
kirill$ gendiff before.json after.json
{
   host: localhost
   proxy: 123.234.53.22
   follow: false
   port: 80
   config: {
      backup: none
    - auto: yes
    + configuration: {
         param: value
      }
   }
}
```

#### Plain
Plain output format display information for every affected row in plain text format. If object was fully changed it's displays as a 'complex value' string.

**Example**

Using same before.json and after.json files let's look on output:

```
kirill$ gendiff before.json after.json --format plain
Property 'config.auto' was removed
Property 'config.configuration' was added with complex value
```

#### JSON
JSON mode outputs reflects AST with following types:
* nested
* new
* deleted
* modified

**Example**
```
kirill$ gendiff before.json after.json --format json
[{"key":"host","type":"unmodified","value":"hexlet.io"},{"key":"proxy","type":"unmodified","value":"123.234.53.22"},{"key":"follow","type":"unmodified","value":false},{"key":"port","type":"unmodified","value":80},{"key":"config","type":"nested","children":[{"key":"backup","type":"unmodified","value":"none"},{"key":"auto","type":"deleted","value":"yes"},{"key":"configuration","type":"new","value":{"param":"value"}}]}]

```

### Configuration format supports

gendiff supports json, yml, ini formats with nested structure.
You can easily add your own parser in parsers.js.
