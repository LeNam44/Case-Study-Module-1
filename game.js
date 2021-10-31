const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const imageElement = document.getElementById('image')
let music = document.getElementById('music')
music.loop = true;
let state = {}
// Hàm để bắt đầu game
function startGame() {
    state = {}
    showTextNode(1)

}
//Hàm kiểm tra điều kiện xem có hiển thị lựa chọn ra không, dựa theo điều kiện state
function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

function showTextNode(textNodeIndex) {
    let textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text

    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
    textNode.imageSource ? imageElement.setAttribute("src", textNode.imageSource) : imageElement.style.display = "none"

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

const textNodes = [
    {
        id: 1,
        text: 'Bạn tỉnh lại ở một thế giới mới.',
        imageSource: 'img/startgame.png',
        options: [
            {
                text: 'Khám phá',
                nextText: 2
            },
        ]
    },
    {
        id: 2,
        text: 'Bạn đang ở trong một khu rừng xa lạ. Bạn sẽ ...',
        imageSource: 'img/wakeupforest.JPG',
        options: [
            {
                text: 'Đi sâu vào trong rừng',
                nextText: 3
            },
            {
                text: 'Đi về hướng có ánh sáng',
                nextText: 4
            },
            {
                text: 'Đi dọc theo dòng nước',
                nextText: 5
            },
            {
                text: 'Nghỉ tại chỗ',
                nextText: 6
            },
            {
                text: 'Đi tới điểm cuối của khu rừng',
                nextText: 44
            },
            {
              text: 'Kiểm tra nguyên tố sở hữu',
              nextText: 13
            },
            {
                text: 'Bảy nguyên tố',
                requiredState: (currentState) => currentState.hasWood && currentState.hasEarth && currentState.hasWind && currentState.hasFire && currentState.hasWater && currentState.hasElectric && currentState.hasIce,
                nextText: 46
            },
        ]
    },
    {
        id: 3,
        text: 'Bạn đi theo hướng sâu vào khu rừng. Sau một khoảng thời gian, bạn gặp một cái cây có hình thù kỳ lạ. Có ánh sáng màu tím phát ra từ gốc của nó. Bạn sẽ ...',
        imageSource: 'img/strangeroot.JPG',
        options: [
            {
                text: 'Tiến đến xem',
                nextText: 7
            },
            {
                text: 'Quay về rừng',
                nextText: 2
            },
        ]
    },
    {
        id: 4,
        text: 'Trước mặt bạn là một thành phố. Bạn thấy có nhiều người ở xung quanh, bạn sẽ gặp...',
        imageSource: 'img/CityOfWater.JPG',
        options: [
            {
                text: 'Lính gác',
                requiredState: (currentState) => currentState.findGuard,
                nextText: 8
            },
            {
                text: 'Người bán hàng',
                nextText: 9
            },
            {
                text: 'Mấy đứa bé',
                nextText: 10
            },
            {
                text: 'Đi tìm gặp Trưởng Thành',
                requiredState: (currentState) => currentState.canMeet,
                nextText: 11
            },
            {
                text: 'Quay về rừng',
                nextText: 2
            },
            {
                text: 'Đi Băng Động',
                requiredState: (currentState) => currentState.hasIceMap,
                nextText: 24
            },
            {
                text: 'Đi Hỏa Thành',
                requiredState: (currentState) => currentState.hasFireMap,
                nextText: 43
            },
        ]
    },
    {
        id: 7,
        text: 'Khi lại gần, bạn nhìn thấy gốc cây bắt đầu tách ra, có rất nhiều tia điện phát ra từ gốc cây.',
        imageSource: 'img/electroSource.JPG',
        options: [
            {
                text: 'Chạm vào',
                setState: { hasElectric: true },
                nextText: 12
            },
            {
                text: 'Quay về rừng',
                nextText: 2
            },
        ]
    },
    {
        id: 8,
        text: 'Bạn nhìn thấy người lính gác ở gần cổng thành phố. Bạn quyết định tiến đến chỗ anh ta và hỏi thăm.',
        imageSource: 'NPC/linhgac.png',
        options: [
            {
                text: 'Đây là đâu?',
                nextText: 16
            },
            {
                text: 'Tôi là ai',
                nextText: 17
            },
            {
                text: 'Quay lại cửa thành',
                nextText: 4
            }
        ]
    },
    {
        id: 16,
        text: 'Lính gác: Đây là Thủy Thành, nơi được thần Thủy bảo vệ và phù hộ. Nhưng tôi lo là điều đó không còn tiếp diễn được bao lâu nữa. Theo lời tiên tri của Phù Thủy Vanga thì Ma Thần sắp được phục sinh rồi, tất cả chúng ta sẽ phải chết.',
        imageSource: 'NPC/linhgac.png',
        options: [
            {
                text: 'Ma Thần là ai?',
                nextText: 18
            },
            {
                text: 'Có cách nào để ngăn hắn lại không?',
                requiredState: (currentState) => currentState.knowAboutMa,
                nextText: 19
            },
            {
                text: 'Quay lại',
                nextText: 8
            },
            {
                text: 'Quay lại cửa thành',
                nextText: 4
            },
        ]
    },
    {
        id: 17,
        text: 'Lính gác: Tôi làm sao biết được anh là ai ???',
        imageSource: 'NPC/linhgac.png',
        options: [
            {
                text: 'Quay lại',
                nextText: 8
            },
            {
                text: 'Quay lại cửa thành',
                nextText: 4
            }
        ]
    },
    {
        id: 18,
        text: 'Lính gác: Hắn là tồn tại từ 1000 năm trước, đến từ một thế giới khác chúng ta. Hắn từng dẫn hàng vạn ma quỷ đến thế giới này, mang theo chết chóc. Khi đó, bảy vị thần của bảy nguyên tố cấu thành nên thế giới này đã hợp sức và phong ấn hắn lại, đẩy lui ma quỷ. Thế nhưng từ đó đến nay, bảy vị thần đã biến mất, phong ấn cũng đã suy yếu, khi hắn thoát khốn và khôi phục sức mạnh cũng là lúc chúng ta phải chết. ',
        imageSource: 'NPC/linhgac.png',
        options: [
            {
                text: 'Quay lại',
                setState: { knowAboutMa: true },
                nextText: 16
            }
        ]
    },
    {
        id: 19,
        text: 'Lính gác: Theo truyền thuyết, người có khả năng tiếp nhận và điều khiển nguồn sức mạnh Nguyên Thủy của bảy nguyên tố sẽ có khả năng tiêu diệt Ma Thần.',
        imageSource: 'NPC/linhgac.png',
        options: [
            {
                text: 'Làm sao để tìm nguồn sức mạnh Nguyên Thủy của chúng?',
                setState: { canMeet: true },
                nextText: 20
            }
        ]
    },
    {
        id: 20,
        text: 'Lính gác: Anh có thể tìm gặp Trưởng Thành, ông ấy ở Vân Đảo đang lơ lửng phía trên chúng ta.',
        imageSource: 'NPC/linhgac.png',
        options: [
            {
                text: 'Quay lại cửa thành',
                nextText: 4
            },
            {
                text: 'Quay lại',
                nextText: 16
            }
        ]
    },
    {
        id: 9,
        text: 'Bạn thấy có một người bán hoa quả ở gần cổng thành. Bạn quyết định tiến đến chỗ anh ta.',
        imageSource: 'npc/nguoibanhang.png',
        options: [
            {
                text: 'Đây là đâu?',
                nextText: 21
            },
        ]
    },
    {
        id: 21,
        text: 'Người bán hàng: Đây là Thủy Thành, nơi được thần Thủy bảo vệ và phù hộ. Trông cậu có vẻ mệt, cậu có muốn mua ít hoa quả để ăn không?',
        imageSource: 'npc/nguoibanhang.png',
        options: [
            {
                text: 'Tôi muốn biết nhiều hơn',
                setState: { findGuard: true },
                nextText: 23
            },
            {
                text: 'Xung quanh đây có thành phố nào khác không?',
                nextText: 22
            },
            {
                text: 'Tôi không có tiền',
                setState: {hasEnergy: true},
                nextText: 32
            },
            {
                text: 'Quay lại cửa thành',
                nextText: 4
            }
        ]
    },
    {
        id: 22,
        text: 'Người bán hàng: Phía đông là Băng Động. Phía Nam là Hỏa Thành. Xuất phát từ cửa thành là có thể đến.',
        imageSource: 'npc/nguoibanhang.png',
        options: [
            {
                text: 'Quay lại cửa thành',
                setState: { hasIceMap: true, hasFireMap: true },
                nextText: 4
            }
        ]
    },
    {
        id: 23,
        text: 'Người bán hàng: Hãy đi tìm lính gác. Anh ta ở trước cổng thành.',
        imageSource: 'npc/nguoibanhang.png',
        options: [
            {
                text: 'Quay lại cửa thành',
                nextText: 4
            },
            {
                text: 'Quay lại',
                nextText: 21
            }
        ]
    },
    {
        id: 10,
        text: 'Bạn nhìn thấy mấy đứa bé đang chơi một trò chơi gì đó với nhau. Bạn tiến đến gần.',
        imageSource: 'npc/trecon.png',
        options: [
            {
                text: 'Các em đang chơi gì vậy',
                nextText: 26
            }
        ]
    },
    {
        id: 26,
        text: 'Một đứa bé: Đây là trò thẻ bài nguyên tố.  Ai có bài nguyên tố mạnh hơn thì có thể lấy được nguyên tố của người khác.',
        imageSource: 'npc/trecon.png',
        options: [
            {
                text: 'Làm sao để biết nguyên tố nào mạnh hơn?',
                nextText: 27
            }
        ]
    },
    {
        id: 27,
        text: 'Đứa bé:  Cái này phức tạp lắm, anh phải ghi nhớ lại nhé.\n' +
            'Sét là nguyên tố bổ trợ, cần phải có Sét để lấy được các nguyên tố Nguyên Thủy\n' +
            'Dùng Sét để lấy Thủy\n' +
            'Dùng Thủy để lấy Hỏa\n' +
            'Dùng Hỏa để lấy Mộc\n' +
            'Dùng Mộc để lấy Thổ\n' +
            'Dùng Thổ và Mộc để lấy Phong\n' +
            'Dùng Hỏa và Sét để lấy Băng',
        imageSource: 'npc/trecon.png',
        options: [
            {
                text: 'Quay lại cửa thành',
                nextText: 4
            }
        ]
    },
    {
        id: 5,
        text: 'Bạn đi theo dòng nước, bạn đi mãi nhưng không thấy điểm cuối. Trước mặt bạn là một tầng sương mù dày đặc.',
        imageSource: 'img/fog.jpg',
        options: [
            {
                text: 'Quay về rừng',
                nextText: 2
            },
            {
                text: 'Dùng Thổ và Mộc',
                requiredState: (currentState) => currentState.hasWood && currentState.hasEarth,
                nextText: 28
            }
        ]
    },
    {
        id: 28,
        text: 'Bạn dùng sức mạnh của Thổ và Mộc, phá tan sương mù, trước mặt bạn là một ngôi đền khổng lồ, có vẻ như trong đó chính là nguyên tố Phong mà bạn đang tìm kiếm.',
        imageSource: 'img/windtemple.png',
        options: [
            {
                text: 'Dùng Thổ và Mộc',
                setState: {hasWind: true},
                nextText: 29
            }
        ]
    },
    {
        id: 29,
        text: 'Bạn đã nhận được nguyên tố Nguyên Thủy của Phong',
        imageSource: 'img/wind.gif',
        options: [
            {
                text: 'Quay về rừng',
                nextText: 2
            }
        ]
    },
    {
        id: 6,
        text: 'Bạn nghỉ một khoảng thời gian ngắn và cảm thấy khỏe lên. Trong lúc ngồi nghỉ, bạn cảm nhận được một cái gì đó, nhưng không rõ.',
        imageSource: 'img/wakeupforest.JPG',
        options: [
            {
                text: 'Đứng dậy',
                nextText: 2
            },
            {
                text: 'Nghỉ lâu hơn',
                requiredState: (currentState) => currentState.hasWood,
                nextText: 30
            }
        ]
    },
    {
        id: 30,
        text: 'Với nguyên tố Mộc, bạn đã cảm nhận được nguyên tố Thổ. Có vẻ như nó ở quanh khu vực này.',
        imageSource: 'img/wood.gif',
        options: [
            {
                text: 'Dùng Mộc để tìm',
                setState: {hasEarth: true},
                nextText: 31
            }
        ]
    },
    {
        id: 31,
        text: 'Bạn đã tìm thấy Thổ ở một nơi không xa khu rừng. Bạn đã nhận được nguyên tố Nguyên Thủy của Thổ.',
        imageSource: 'img/earth.gif',
        options: [
            {
                text: 'Quay về rừng',
                nextText: 2
            }
        ]
    },
    {
        id: 32,
        text: 'Người bán hàng: Ăn tạm quả chuối này đi, tôi cho.\n' +
            '\n' +
            'Sau khi ăn chuối, bạn cảm thấy tràn đầy năng lượng.',
        imageSource: 'npc/nguoibanhang.png',
        options: [
            {
                text: 'Quay lại',
                nextText: 21
            }
        ]
    },
    {
        id: 24,
        text: 'Bạn đi về phía đông, sau một khoảng thời gian dài, bạn cũng đến được Băng Động. Bạn cần hai loại nguyên tố để có thể lấy được nguyên tố Băng.',
        imageSource: 'img/icecave.jpg',
        options: [
            {
                text: 'Quay về Thủy Thành',
                nextText: 4
            },
            {
                text: 'Dùng Hỏa và Sét',
                requiredState: (currentState) => currentState.hasFire && currentState.hasElectric,
                setState: {hasIce: true},
                nextText: 33
            }
        ]
    },
    {
        id: 43,
        text: 'Bạn đi về phía Nam, sau một khoảng thời gian dài, bạn cũng đến được Hỏa Thành. Bạn đi xung quanh thành phố nhưng không thấy một ai.',
        imageSource: 'img/CityOfFire.jpg',
        options: [
            {
                text: 'Quay về Thủy Thành',
                nextText: 4
            },
            {
                text: 'Tiền về trung tâm thành',
                nextText: 25
            }
        ]
    },
    {
        id: 25,
        text: 'Bạn quyết định tiến đến ngôi đền ở trung tâm. Ở đây bạn gặp một con quỷ, có vẻ như nó đã tấn công tòa thành này và chiếm lấy nguyên tố Hỏa. Bạn cần Thủy để đánh bại nó.',
        imageSource: 'img/fireboss.jpg',
        options: [
            {
                text: 'Bỏ chạy về Thủy Thành',
                nextText: 4
            },
            {
                text: 'Dùng Thủy',
                requiredState: (currentState) => currentState.hasWater,
                setState: {hasFire: true},
                nextText: 34
            }
        ]
    },
    {
        id: 33,
        text: 'Bạn đã nhận được nguyên tố Nguyên Thủy của Băng',
        imageSource: 'img/ice.gif',
        options: [
            {
                text: 'Quay về Thủy Thành',
                nextText: 4
            }
        ]
    },
    {
        id: 34,
        text: 'Bạn dùng sức mạnh của Thủy và đánh bại được con quỷ. Bạn đã nhận được nguyên tố Nguyên Thủy của Hỏa',
        imageSource: 'img/fire.gif',
        options: [
            {
                text: 'Quay về Thủy Thành',
                nextText: 4
            }
        ]
    },
    {
        id: 11,
        text: 'Theo hướng dẫn của lính gác, bạn đi tìm Trưởng Thành và được đưa lên Vân Đảo. Bạn nhìn thấy Trưởng Thành đang đứng ở trong một ngôi đền, ông ấy đang nói chuyện một mình.',
        imageSource: 'img/watertemple.jpg',
        options: [
            {
                text: 'Tiến đến',
                nextText: 35
            }
        ]
    },
    {
        id: 35,
        text: 'Trưởng Thành thở dài: Chúng ta không còn nhiều thời gian nữa. Truyền thuyết nói rằng người lấy được nguyên tố Nguyên Thủy của Sét ở CUỐI khu rừng sẽ tới lấy đi Thủy nguyên tố.\n' +
            'Hỡi Thủy Thần vĩ đại, hãy cho con biết khi nào người kia mới xuất hiện đây.\n' +
            '(Gợi ý: Nếu chưa có Sét. Hãy đi tìm nguyên tố Sét)',
        imageSource: 'npc/onggia.png',
        options: [
            {
                text: 'Tôi đã lấy được nguyên tố Sét',
                requiredState: (currentState) => currentState.hasElectric,
                nextText: 36
            },
            {
                text: 'Quay lại cửa thành',
                nextText: 4
            }
        ]
    },
    {
        id: 36,
        text: 'Trưởng Thành: Thật ư! Hãy cho ta xem, mau lên!',
        imageSource: 'npc/onggia.png',
        options: [
            {
                text: 'Dùng Sét',
                nextText: 37
            }
        ]
    },
    {
        id: 37,
        text: 'Trưởng Thành: Đúng là cậu rồi, cuối cùng cũng đến. Mau, dùng Sét, hãy thử xem Thủy nguyên tố có tiếp nhận cậu không.',
        imageSource: 'npc/onggia.png',
        options: [
            {
                text: 'Dùng sét',
                setState: {hasWater: true},
                nextText: 38
            }
        ]
    },
    {
        id: 38,
        text: 'Bạn đã nhận được nguyên tố Nguyên Thủy của Thủy',
        imageSource: 'img/water.gif',
        options: [
            {
                text: 'Làm sao để tôi có thể tìm các nguyên tố khác?',
                nextText: 39
            }
        ]
    },
    {
        id: 39,
        text: 'Trưởng Thành: Cậu có thể đi Băng Động để lấy Băng, Hỏa Thành để lấy Hỏa. Nguyên tố Mộc thì theo truyền thuyết, nó ở rất gần Nguyên tố Sét. Nhưng nên nhớ, cậu phải sở hữu được Hỏa trước khi có thể cảm nhận được Mộc. Nguyên tố Thổ ở trong rừng, nhưng cậu phải ở tại chỗ một khoảng thời gian dài với nguyên tố Mộc mới cảm nhận được. Còn về Nguyên tố Phong, đó là nguyên tố thần bí nhất, ta chỉ nghe thấy một tin đồn về nó: Thổ Mộc hội, Phong hiện\n' +
            '(Gợi ý: Có vẻ như để tìm được Phong, bạn phải lấy được cả Thổ và Mộc)\n' +
            '\n' +
            'Sau khi cậu tìm đủ bảy nguyên tố, hãy đi đến Phong Ma Sơn, dùng chúng để phong ấn lại Ma Thần.',
        imageSource: 'npc/onggia.png',
        options: [
            {
                text: 'Quay lại cửa thành',
                nextText: 4
            }
        ]
    },
    {
        id: 40,
        text: 'Sau khi đến Phong Ma Sơn, bạn thấy một cơn lốc xoáy khổng lồ, trung tâm ngọn núi đang bị kéo lên. Có vẻ như Ma Thần sắp phá vỡ được phong ấn.',
        imageSource: 'img/phongmason.jpg',
        options: [
            {
                text: 'Phong ấn Ma Thần',
                nextText: 41
            },
            {
                text: 'Dùng toàn lực Phong ấn Ma Thần',
                requiredState: (currentState) => currentState.hasEnergy,
                nextText: 42
            },
            {
                text: 'Bạn chưa sẵn sàng. Quay về rừng',
                nextText: 2
            }
        ]
    },
    {
        id: 41,
        text: 'Bạn sử dụng tất cả bảy nguyên tố. Trong lúc phong ấn, bạn cảm thấy đuối sức. Khi phong ấn gần hoàn thành, do không ăn gì, bạn bị đói và không còn sức để tiếp tục dẫn đến phong ấn thất bại. Ma Thần đã phục sinh, hắn cướp đi bảy nguyên tố từ bạn. Thế giới bị hủy diệt.\n',
        imageSource: 'img/badend.JPG',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 42,
        text: 'Bạn sử dụng tất cả bảy nguyên tố. Trong lúc phong ấn, bạn cảm thấy đuối sức. Khi phong ấn gần hoàn thành, nhờ ăn chuối mà bạn đã đủ sức để tiếp tục. Ma Thần đã bị phong ấn, Chúc mừng, bạn đã hoàn thành nhiệm vụ.',
        imageSource: 'img/endgame.jpg',
        options: [
            {
                text: 'Chơi lại',
                nextText: -1
            }
        ]
    },
    {
        id: 12,
        text: 'Bạn nhận được nguyên tố Nguyên Thủy của Sét. Nó sẽ có ích khi bạn kết hợp với các nguyên tố khác.',
        imageSource: 'img/electric.gif',
        options: [
            {
                text: 'Quay lại',
                nextText: 7
            },

        ]
    },
    {
        id: 14,
        text: 'Bạn đi theo một con đường nhỏ.  Bạn đi mãi cho tới khi nhận ra trời đã sáng. Cuối cùng bạn cũng thoát khỏi khu rừng. Trước mặt bạn là một cây đại thụ và một tượng thần.',
        imageSource: 'img/statueAtTree.png',
        options: [
            {
                text: 'Dùng Hỏa',
                setState: { hasWood: true },
                nextText: 15
            }
        ]
    },
    {
        id: 15,
        text: 'Bạn đã nhận được nguyên tố Nguyên Thủy của Mộc',
        imageSource: 'img/wood.gif',
        options: [
            {
                text: 'Quay về rừng',
                nextText: 2
            }
        ]
    },
    {
        id: 46,
        text: 'Bạn đã tập hơp đủ bảy loại nguyên tố. Đã đến lúc đi Phong Ma Sơn',
        imageSource: 'img/allelements.gif',
        options: [
            {
                text: 'Tiến về Phong Ma Sơn',
                nextText: 40
            }
        ]
    },
    {
        id: 13,
        text: 'Các nguyên tố bạn đã nhận được là:',
        imageSource: 'img/allelements.gif',
        options: [
            {
                text: 'Sét',
                requiredState: (currentState) => currentState.hasElectric
            },
            {
                text: 'Hỏa',
                requiredState: (currentState) => currentState.hasFire
            },
            {
                text: 'Thủy',
                requiredState: (currentState) => currentState.hasWater
            },
            {
                text: 'Băng',
                requiredState: (currentState) => currentState.hasIce
            },
            {
                text: 'Phong',
                requiredState: (currentState) => currentState.hasWind
            },
            {
                text: 'Mộc',
                requiredState: (currentState) => currentState.hasWood
            },
            {
                text: 'Thổ',
                requiredState: (currentState) => currentState.hasEarth
            },
            {
                text: 'Quay lại',
                nextText: 2
            },
        ]
    },
    {
        id: 44,
        text: 'Bạn đi sâu vào khu rừng, vượt qua gốc cây lúc trước, tiến về điểm cuối. Tại đây, bạn tìm đường đi tiếp.',
        imageSource: 'img/endofforest.JPG',
        options: [
            {
                text: 'Đi sang trái',
                requiredState: (currentState) => currentState.hasFire,
                nextText: 14
            },
            {
                text: 'Đi sang phải',
                nextText: 45
            },
            {
                text: 'Quay về rừng',
                nextText: 2
            }
        ]
    },
    {
        id: 45,
        text: 'Đây là đường cụt, bạn không thể đi được thêm nữa',
        imageSource: 'img/endofroad.png',
        options: [
            {
                text: 'Quay lại',
                nextText: 44
            },
        ]
    }
]

startGame()