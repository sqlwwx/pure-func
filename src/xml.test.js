const { parse, toXml } = require('./xml')

/* eslint-env jest */
describe('xml', () => {
  it('parse', async () => {
    let content = '\n<msg><appmsg appid="" sdkver=""><title><![CDATA[邀请你加入群聊]]></title><des><![CDATA["孩子系"邀请你加入群聊，进入可查看详情。]]></des><action>view</action><type>5</type><showtype>0</showtype><content></content><url><![CDATA[http://support.weixin.qq.com/cgi-bin/mmsupport-bin/addchatroombyinvite?ticket=AQMf7Q5hpiw%2B5DP7N5wNig%3D%3D]]></url><thumburl><![CDATA[http://weixin.qq.com/cgi-bin/getheadimg?username=b3bac27e215f2f754dfd7cfc7740ea804fb85712599c8209e256cab4ad7bcb28]]></thumburl><lowurl></lowurl><appattach><totallen>0</totallen><attachid></attachid><fileext></fileext></appattach><extinfo></extinfo></appmsg><appinfo><version></version><appname></appname></appinfo></msg>'
    let contentJson = await parse(content)
    expect(contentJson).toHaveProperty('msg.appmsg.url')
    content = '<msg fromusername="erichoo85" encryptusername="v1_aada49f96f8014c1c69615b6aedc04c4d45561e5dd766b0c2e3532ba40fbdf3f@stranger" fromnickname="精彩" content="我是精彩" fullpy="jingcai" shortpy="JC" imagestatus="3" scene="30" country="HK" province="Eastern" city="" sign="如何" percard="1" sex="1" alias="" weibo="" weibonickname="" albumflag="0" albumstyle="0" albumbgimgid="915523818749952_915523818749952" snsflag="49" snsbgimgid="http://szmmsns.qpic.cn/mmsns/iay1Af5jhtu3e33deW1c4Lg9eHFzvUY4w09e8sibagwZU6bTZF5YLFWaibSaTQG98ZxhaK4Sic3iahtY/0" snsbgobjectid="12590511013798031557" mhash="6c0b0f82c29eadabe247deb0816b8098" mfullhash="6c0b0f82c29eadabe247deb0816b8098" bigheadimgurl="http://wx.qlogo.cn/mmhead/ver_1/B9AXQmc9qj9jlWnWficuXfoxyWbrYPZU34MdE5icle0hsxmbLvTWrVEsr88S85hIRthKMticCiawxo1FboUTwvqTre9xIdXJFN36VTnoxicxHel0/0" smallheadimgurl="http://wx.qlogo.cn/mmhead/ver_1/B9AXQmc9qj9jlWnWficuXfoxyWbrYPZU34MdE5icle0hsxmbLvTWrVEsr88S85hIRthKMticCiawxo1FboUTwvqTre9xIdXJFN36VTnoxicxHel0/132" ticket="v2_2a380b4ff67272f6827c8f1ade284b747d2788782f26fb0dd4166a284a78419e02e165f7e78bece9c4d4b9ef1b3cbdfe821b5905a7daf96bf8727497ecc2acb8@stranger" opcode="2" googlecontact="" qrticket="" chatroomusername="" sourceusername="" sourcenickname=""><brandlist count="0" ver="667255550"></brandlist></msg>'
    contentJson = await parse(content)
    expect(contentJson).toHaveProperty('msg.@_encryptusername')
    expect(contentJson).toHaveProperty('msg.@_ticket')
    expect(parse('<a>')).rejects.toHaveProperty('code', 'InvalidXml')
    expect(parse('')).rejects.toHaveProperty('code', 'InvalidXml')
  })
  it('toXml', async () => {
    expect(toXml({ a: 1 })).toEqual('<a>1</a>')
    expect(toXml({ a: 1, b: 2 })).toEqual('<a>1</a><b>2</b>')
    expect(toXml({ a: 1, b: { c: 2 } })).toEqual('<a>1</a><b><c>2</c></b>')
    let content = '<msg><appmsg appid="" sdkver=""><title><![CDATA[邀请你加入群聊]]></title><des><![CDATA["孩子系"邀请你加入群聊，进入可查看详情。]]></des><action>view</action><type>5</type><showtype>0</showtype><content></content><url><![CDATA[http://support.weixin.qq.com/cgi-bin/mmsupport-bin/addchatroombyinvite?ticket=AQMf7Q5hpiw%2B5DP7N5wNig%3D%3D]]></url><thumburl><![CDATA[http://weixin.qq.com/cgi-bin/getheadimg?username=b3bac27e215f2f754dfd7cfc7740ea804fb85712599c8209e256cab4ad7bcb28]]></thumburl><lowurl></lowurl><appattach><totallen>0</totallen><attachid></attachid><fileext></fileext></appattach><extinfo></extinfo></appmsg><appinfo><version></version><appname></appname></appinfo></msg>'
    let contentJson = await parse(content)
    expect(toXml(contentJson)).toEqual(content)
    expect(toXml({ msg: { appmsg: { '@_appid': 1 } } }))
      .toEqual('<msg><appmsg appid="1"></appmsg></msg>')
    expect(toXml({ msg: { appmsg: { '@__appid': 1 } } }, { attributeNamePrefix: '@__' }))
      .toEqual('<msg><appmsg appid="1"></appmsg></msg>')
    expect(toXml({ msg: { appmsg: { '@_appid': 1 } } }))
      .toEqual('<msg><appmsg appid="1"></appmsg></msg>')
  })
})
