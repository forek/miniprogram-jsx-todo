import mpjsx from 'miniprogram-jsx'

const TodoList = {
  isMpJSXComponent: true,
  render () {
    return (
      <view>
        {this.props.items.map(item => (
          <view class='todo-item' key={item.id} bindtap={this.props.onRemoveItem.bind(null, item)}> * {item.text}</view>
        ))}
      </view>
    )
  }
}

const Todo = {
  isMpJSXComponent: true,
  data () {
    return { items: [], text: '' }
  },
  onLoad (query) {
    console.log(query)
  },
  handleChange (e) {
    const { value } = e.detail
    this.setData({ text: value })
  },
  handleSubmit (e) {
    if (!this.data.text.length) return
    const newItem = {
      text: this.data.text,
      id: Date.now()
    }
    this.setData({
      items: this.data.items.concat(newItem),
      text: ''
    })
  },
  handleRemove (item, e) {
    this.setData({ items: this.data.items.filter(v => v.id !== item.id) })
  },
  render () {
    return (
      <view class='main'>
        <view>TODO</view>
        <TodoList items={this.data.items} onRemoveItem={this.handleRemove} />
        <input type='text' value={this.data.text} bindinput={this.handleChange} />
        <button bindtap={this.handleSubmit}>
          Add #{this.data.items.length + 1}
        </button>
      </view>
    )
  }
}

mpjsx.MpJSXPage(Todo)
