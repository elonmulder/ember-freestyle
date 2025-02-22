import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, select } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

const ARGUMENT = '.FreestyleUsageArgument';
const NAME = `${ARGUMENT}-name`;
const CONTROL = `${ARGUMENT}-controls--String input`;
const SELECT_CONTROL = `${ARGUMENT}-controls--String select`;

module('Integration | Component | freestyle/usage/string', function (hooks) {
  setupRenderingTest(hooks);

  test('renders a text input', async function (assert) {
    assert.expect(4);
    this.set('value', 'Bob');
    this.set('onInput', function (value) {
      assert.strictEqual(value, 'Robert');
    });
    await render(hbs`<Freestyle::Usage::String
      @name="Name"
      @value={{this.value}}
      @onInput={{this.onInput}}
    />`);

    assert.dom(NAME).hasText('Name');
    assert.dom(CONTROL).hasAttribute('type', 'text');
    assert.dom(CONTROL).hasValue('Bob');
    await fillIn(CONTROL, 'Robert');
  });

  test('renders a select list', async function (assert) {
    assert.expect(4);
    this.set('value', 'Bob');
    this.set('options', ['Bob', 'Sue', 'Larry']);
    this.set('onInput', function (value) {
      assert.strictEqual(value, 'Larry');
    });
    await render(hbs`<Freestyle::Usage::String
      @name="Name"
      @value={{this.value}}
      @options={{this.options}}
      @onInput={{this.onInput}}
    />`);

    assert.dom(NAME).hasText('Name');
    assert.dom(SELECT_CONTROL).exists();
    assert.dom(SELECT_CONTROL).hasValue('Bob');
    await select(SELECT_CONTROL, 'Larry');
  });
});
