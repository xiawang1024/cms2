tinymce.PluginManager.add('movehang', function (editor, url) {
  var movego = function () {
    let oldvalue = editor.getContent()
    let newvalue = oldvalue.replace(/(<p>(&nbsp;)+<\/p>)/g, '')
    newvalue = oldvalue.replace(/(<p><br><\/p>)/g, '')
    editor.setContent(newvalue)
    // <p><br></p> 
    // <p>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>

  };
  editor.ui.registry.getAll().icons.movehang || editor.ui.registry.addIcon('movehang', '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.984 12.984v-1.969h12v1.969h-12zM9.984 18.984v-1.969h12v1.969h-12zM9.984 5.016h12v1.969h-12v-1.969zM6 6.984v10.031h2.484l-3.469 3.469-3.516-3.469h2.484v-10.031h-2.484l3.516-3.469 3.469 3.469h-2.484z"></path></svg>');

  // 注册一个工具栏按钮名称
  editor.ui.registry.addButton('movehang', {
    icon: 'movehang',
    tooltip: '去除空行',
    // text: '去除空行',
    onAction: function () {
      movego();
    }
  });

  // 注册一个菜单项名称 menu/menubar
  editor.ui.registry.addMenuItem('movehang', {
    text: '去除空行',
    onAction: function () {
      movego();
    }
  });

  return {
    getMetadata: function () {
      return {
        //插件名和链接会显示在“帮助”→“插件”→“已安装的插件”中
        name: "movehang plugin", //插件名称
        url: "http://movehangplugindocsurl.com", //作者网址
      };
    }
  };
});
