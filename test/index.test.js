const axios2 = require("axios");

const BACKEND_URL = 'http://localhost:3000';
const WS_URL = 'ws://localhost:3001';

const axios = {
    post: async (...args) => {
        try {
            const res = await axios2.post(...args)
            return res
        } catch (err) {
            return err.response
        }
    },
    get: async (...args) => {
        try {
            const res = await axios2.get(...args)
            return res
        } catch (err) {
            return err.response
        }
    },
    put: async (...args) => {
        try {
            const res = await axios2.put(...args)
            return res
        } catch (err) {
            return err.response
        }
    },
    delete: async (...args) => {
        try {
            const res = await axios2.delete(...args)
            return res
        } catch (err) {
            return err.response
        }
    }
}
 
// describe('Authentication', () => {
//     test('user is able to sign only once', async () => {
//         const username = "deepak88" + Math.floor(Math.random() * 100000);
//         const password = 'password123';
//         const type = 'user'
//         const res = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username,
//             password,
//             type
//         })
//         expect(res.status).toBe(200);

//         const updateres = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username,
//             password
//         })
//         expect(updateres.status).toBe(400);
//     });

//     test('signup request failed if the username is empty', async () => {
//         const username = `akash-${Math.random()}`
//         const password = "8765456"
//         const res = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             password
//         })

//         expect(res.status).toBe(400)
//     })

//     test('taking userId when username and password are correct ', async () => {
//         const username = "akash" + Math.floor(Math.random() * 100000);
//         const password = "9876567"
//         const type = "user"
//         const res = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username,
//             password,
//             type
//         })
//         expect(res.status).toBe(200)
//         expect(res.data.userId).toBeDefined()
//     })

//     test('signin or signup succeed if username and password are correct', async () => {
//         const username = "deepak" + Math.floor(Math.random() * 100000);
//         const password = "9876567"
//         const type = "user"
//         await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username,
//             password,
//             type
//         })

//         const res = await axios.post(`${BACKEND_URL}/api/v1/login`, {
//             username,
//             password,
//         })
//         expect(res.status).toBe(200)
//         expect(res.data.token).toBeDefined()
//     })

//     test('signin failed if username and password are incorrect after signup', async () => {
//         const username = `akash-${Math.random()}`
//         const password = "9876567"
//         const type = "user"

//         await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username,
//             password,
//             type
//         })

//         const res = await axios.post(`${BACKEND_URL}/api/v1/login`, {
//             username: "hjakdsjsa",
//             password
//         })
//         expect(res.status).toBe(400)
//     })
// });

// describe('User information endpoint', () => {
//     let usertoken = "";
//     let avatarId = "";
//     let admintoken = "";

//     beforeAll(async () => {
//         const username = "deepak" + Math.floor(Math.random() * 100000);
//         const adminUsername = "admin" + Math.floor(Math.random() * 100000);
//         const password = "87654500"
//         await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username,
//             password,
//             type: "user"
//         })

//         const res = await axios.post(`${BACKEND_URL}/api/v1/login`, {
//             username,
//             password
//         })
//         usertoken = res.data.token

//         await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username: adminUsername,
//             password,
//             type: "admin"
//         })

//         const adminres = await axios.post(`${BACKEND_URL}/api/v1/login`, {
//             username: adminUsername,
//             password
//         })
//         admintoken = adminres.data.token

//         const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//             "name": "Timmy"
//         },{
//             headers: {
//                 authorization: `Bearer ${admintoken}`
//             }
//         })
//         avatarId = avatarResponse.data.avatarId
//     })

//     test('user cant update their metadata with wrong avatar-id', async () => {
//         console.log("usertoken", usertoken)
//         const res = await axios.post(`${BACKEND_URL}/api/v1/users/metadata`, {
//             avatarId: "654345"
//         }, {
//             headers: {
//                 authorization: `Bearer ${usertoken}`
//             }
//         })
//         expect(res.status).toBe(400)
//     })

//     test('user can update their metadata with right avatar-id', async () => {
//         const res = await axios.post(`${BACKEND_URL}/api/v1/users/metadata`, {
//             avatarId
//         }, {
//             headers: {
//                 authorization: `Bearer ${usertoken}`
//             }
//         })
//         expect(res.status).toBe(200)
//     })

//     test('user cant update their metadata with right avatar-id if the auth header is not present', async () => {
//         const res = await axios.post(`${BACKEND_URL}/api/v1/users/metadata`, {
//             avatarId
//         })
//         expect(res.status).toBe(403)
//     })
// })

// describe('User Avatar endpoint', () => {
//     let avatarId;
//     let userId;
//     let admintoken;
//     let usertoken


//     beforeAll(async () => {
//         const username = "akash" + Math.floor(Math.random() * 100000)
//         const password = "87654567"
//         const res = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username,
//             password,
//             type: "admin"
//         })
        
//         const loginresponse = await axios.post(`${BACKEND_URL}/api/v1/login`, {
//             username,
//             password
//         })
//         admintoken = loginresponse.data.token

//         const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//             "name": "Timmy"
//         }, {
//             headers: { 
//                 authorization: `Bearer ${admintoken}`
//             }
//         })
//         avatarId = avatarResponse.data.avatarId

//         const userUsername = "akash" + Math.floor(Math.random() * 100000)
//         const userRes = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username: userUsername,
//             password,
//             type: "user"
//         })
        
//         const Userloginresponse = await axios.post(`${BACKEND_URL}/api/v1/login`, {
//             username: userUsername,
//             password
//         })
//         usertoken = Userloginresponse.data.token

//         const metadataResponse = await axios.post(`${BACKEND_URL}/api/v1/users/metadata`, {
//             avatarId: avatarResponse.data.avatarId
//         }, {
//             headers: { authorization: `Bearer ${usertoken}` }
//         })
//         userId = metadataResponse.data.updateavatar.id
//     })

//     test('Get back user avatar information', async () => {
//         const res = await axios.get(`${BACKEND_URL}/api/v1/users/metadata/bulk?ids=[${userId}]`)
//         expect(res.data.avatars).toBeDefined()
//         expect(res.data.avatars[0].userId).toBe(userId)
//     })

//     test('available avatar list, the recently created avatar', async () => {
//         const response = await axios.get(`${BACKEND_URL}/api/v1/avatars`,{
//             headers: { authorization: `Bearer ${usertoken}` }
//         });
//         expect(response.data.avatars.length).not.toBe(0);
//         const currentAvatar = response.data.avatars.find(x => x.id == avatarId);;
//         expect(currentAvatar).toBeDefined()
//     })
// })

describe('Space dashboard enpoint', () => {
    let admintoken;
    let spaceId;
    let adminId;
    let elements1Id;
    let elements2Id;
    let mapId;
    let userId;
    let usertoken;

    beforeAll(async () => {
        const username = "akash" + Math.floor(Math.random() * 100000)
        const password = "87654567"
        const adminsignupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password,
            type: "admin"
        })
        const adminreponse = await axios.post(`${BACKEND_URL}/api/v1/login`, {
            username,
            password
        })
        admintoken = adminreponse.data.token
        adminId = adminsignupResponse.data.userId

        const userUsername = "akash" + Math.floor(Math.random() * 100000)
        const usersignupresponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username: userUsername,
            password,
            type: "user"
        })
        const userresponse = await axios.post(`${BACKEND_URL}/api/v1/login`, {
            username: userUsername,
            password
        })
        usertoken = userresponse.data.token
        userId = usersignupresponse.data.userId

        const element1 = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
            "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
            "width": 1,
            "height": 1,
            "static": true // weather or not the user can sit on top of this element (is it considered as a collission or not)
        }, {
            headers: {
                authorization: `Bearer ${admintoken}`
            }
        })
        const element2 = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
            "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
            "width": 1,
            "height": 1,
            "static": true // weather or not the user can sit on top of this element (is it considered as a collission or not)
        }, {
            headers: {
                authorization: `Bearer ${admintoken}`
            }
        })
        elements1Id = element1.data.id
        elements2Id = element2.data.id

        const mapResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/map`, {
            "name": "100 person interview room",
            "thumbnail": "https://thumbnail.com/a.png",
            "dimensions": "100x200",
            "defaultElements": [{
                elementId: elements1Id,
                x: 20,
                y: 20
            }, {
                elementId: elements1Id,
                x: 18,
                y: 20
            }, {
                elementId: elements2Id,
                x: 19,
                y: 20
            }]
        }, {
            headers: {
                authorization: `Bearer ${admintoken}`
            }
        })
        mapId = mapResponse.data.id
    }, 15000)

    test('For creating sapce', async () => {
        console.log("first", usertoken)
        const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
            "name": "Test",
            "dimensions": "100x200",
            "mapId": mapId
        }, {
            headers: {
                authorization: `Bearer ${usertoken}`
            }
        })
        spaceId = response.data.spaceId
        expect(response.status).toBe(200)
        expect(response.data.spaceId).toBeDefined()
    })

    test('For creating sapce without mapId (empty space)', async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
            "name": "Test",
            "dimensions": "100x200"
        }, {
            headers: {
                authorization: `Bearer ${usertoken}`
            } 
        })
        expect(response.data.spaceId).toBeDefined()
        expect(response.status).toBe(200)
    })

    test('For creating sapce without mapId and dimensions(empty space and dimension)', async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
            "name": "Test"
        }, {
            headers: {
                authorization: `Bearer ${usertoken}`
            }
        })
        expect(response.status).toBe(400)
    })

    test('Deleting an space that does exist', async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
            "name": "Test",
            "dimensions": "100x200"
        }, {
            headers: {
                authorization: `Bearer ${usertoken}`
            }
        })
        const deleteResponse = await axios.delete(`${BACKEND_URL}/api/v1/space/${response.data.spaceId}`, {
            headers: {
                authorization: `Bearer ${usertoken}`
            }
        })

        expect(deleteResponse.status).toBe(200)
    })

    test('Deleting an space that doesnt exist', async () => {
        const res = await axios.delete(`${BACKEND_URL}/api/v1/space/randomid`, {
            headers: {
                authorization: `Bearer ${usertoken}`
            }
        })
        expect(res.status).toBe(400)
    })

    test('user should not be able to delete a space created by someone other user', async () => {
        const res = await axios.delete(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
            headers: {
                authorization: `Bearer ${admintoken}`
            }
        })
        expect(res.status).toBe(403)
    })

    test('admin has no space initially', async () => {
        console.log(admintoken)
        const res = await axios.get(`${BACKEND_URL}/api/v1/space/all`, {
            headers: {
                authorization: `Bearer ${admintoken}`
            }
        })
        expect(res.data.spaces.length).toBe(0);
    })

    test('admin create space initially and check for it', async () => {
        const spaceCreateResponse = await axios.post(`${BACKEND_URL}/api/v1/space`, {
            "name": "Test",
            "dimensions": "100x200"
        }, {
            headers: {
                authorization: `Bearer ${admintoken}`
            }
        })

        const res = await axios.get(`${BACKEND_URL}/api/v1/space/all`, {
            headers: {
                authorization: `Bearer ${admintoken}`
            }
        })
        const filterredSpace = res.data.spaces.find(x => x.id == spaceCreateResponse.data.spaceId)
        expect(res.data.spaces.length).toBe(1);
        expect(filterredSpace).toBeDefined()
    })
})

// describe('Arena endpoints', () => {
//     let admintoken;
//     let spaceId;
//     let adminId;
//     let elements1Id;
//     let elements2Id;
//     let mapId;
//     let userId;
//     let usertoken;

//     beforeAll(async () => {
//         const username = `akash-${Math.random()}`
//         const password = "87654567"
//         const adminsignupresponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username,
//             password,
//             type: "admin"
//         })
//         const adminreponse = await axios.post(`${BACKEND_URL}/api/v1/login`, {
//             username,
//             password
//         })
//         admintoken = adminreponse.data.token
//         adminId = adminsignupresponse.data.userId

//         const usersignupresponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username: username + Math.random(),
//             password,
//             type: "user"
//         })
        
//         const userreponse = await axios.post(`${BACKEND_URL}/api/v1/login`, {
//             username: usersignupresponse.data.username,
//             password
//         })
//         usertoken = userreponse.data.token
//         userId = usersignupresponse.data.userId

//         const element1 = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//             "width": 1,
//             "height": 1,
//             "static": true // weather or not the user can sit on top of this element (is it considered as a collission or not)
//         }, {
//             headers: {
//                 authorization: `Bearer ${admintoken}`
//             }
//         })
//         const element2 = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//             "width": 1,
//             "height": 1,
//             "static": true // weather or not the user can sit on top of this element (is it considered as a collission or not)
//         }, {
//             headers: {
//                 authorization: `Bearer ${admintoken}`
//             }
//         })
//         elements1Id = element1.data.id
//         elements2Id = element2.data.id

//         const mapResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/map`, {
//             "thumbnail": "https://thumbnail.com/a.png",
//             "dimensions": "100x200",
//             "name": "100 person interview room",
//             "defaultElements": [{
//                 elementId: elements1Id,
//                 x: 20,
//                 y: 20
//             }, {
//                 elementId: elements1Id,
//                 x: 18,
//                 y: 20
//             }, {
//                 elementId: elements2Id,
//                 x: 19,
//                 y: 20
//             }]
//         }, {
//             headers: {
//                 authorization: `Bearer ${admintoken}`
//             }
//         })
//         mapId = mapResponse.data.id

//         const spaceresponse = await axios.post(`${BACKEND_URL}/api/v1/space`, {
//             "name": "Test",
//             "dimensions": "100x200",
//             "mapId": mapId
//         }, {
//             headers: {
//                 authorization: `Bearer ${admintoken}`
//             }
//         })
//         spaceId = spaceresponse.data.spaceID
//     })

//     test('incorrect spaceid return a 400 statuscode', async () => {
//         const response = await axios.get(`${BACKEND_URL}/api/v1/space/randomspaceid`, {
//             headers: {
//                 authorization: `Bearer ${usertoken}`
//             }
//         })
//         expect(response.statusCode).toBe(400)
//     })

//     test('with correct spaceid return all the element', async () => {
//         const response = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
//             headers: {
//                 authorization: `Bearer ${usertoken}`
//             }
//         })
//         expect(response.data.dimensions).toBe("100x200")
//         expect(response.data.elements).toBe(3)
//     })

//     test('user is able to delete an element from space', async () => {
//         const response = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
//             headers: {
//                 authorization: `Bearer ${usertoken}`
//             }
//         })

//         await axios.delete(`${BACKEND_URL}/api/v1/space/element`, {
//             id: response.data.element[0].id,
//         }, {
//             headers: {
//                 authorization: `Bearer ${usertoken}`
//             }
//         })

//         const newresponse = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
//             headers: {
//                 authorization: `Bearer ${usertoken}`
//             }
//         })
//         expect(newresponse.data.elements).toBe(2)
//     })

//     test('adding an element with right information', async () => {
//         const response = await axios.post(`${BACKEND_URL}/api/v1/space/element`, {
//             "elementId": elements1Id,
//             "spaceId": spaceId,
//             "x": 50,
//             "y": 20
//         }, {
//             headers: {
//                 authorization: `Bearer ${usertoken}`
//             }
//         })
//         const newresponse = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
//             headers: {
//                 authorization: `Bearer ${usertoken}`
//             }
//         })
//         expect(newresponse.data.elements).toBe(3)
//         expect(response.statusCode).toBe(200);
//     })

//     test('adding an element without right information', async () => {
//         const response = await axios.post(`${BACKEND_URL}/api/v1/space/element`, {
//             "elementId": elements1Id,
//             "spaceId": spaceId,
//             "x": 50896875,
//             "y": 2087786
//         }, {
//             headers: {
//                 authorization: `Bearer ${usertoken}`
//             }
//         })
//         expect(response.statusCode).toBe(400);
//     })
// })

// describe("Admin/Map Creator endpoints", () => {
//     let admintoken;
//     let adminId;
//     let userId;
//     let usertoken;

//     beforeAll(async () => {
//         const username = `akash-${Math.random()}`
//         const password = "87654567"
//         const adminreponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username,
//             password,
//             type: "admin"
//         })
//         admintoken = adminreponse.data.token
//         adminId = adminreponse.data.userId

//         const userreponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username: username - Math.random(),
//             password,
//             type: "user"
//         })
//         usertoken = userreponse.data.token
//         userId = userreponse.data.userId
//     })

//     test("user is not able to hit admin endpoint", async () => {
//         const elementresponse = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//             "width": 1,
//             "height": 1,
//             "static": true // weather or not the user can sit on top of this element (is it considered as a collission or not)
//         }, {
//             headers: {
//                 authorization: `Bearer ${usertoken}`
//             }
//         })

//         const updateelementresponse = await axios.put(`${BACKEND_URL}/api/v1/admin/element/123`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE"
//         }, {
//             headers: {
//                 authorization: `Bearer ${usertoken}`
//             }
//         })

//         const mapResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/map`, {
//             "thumbnail": "https://thumbnail.com/a.png",
//             "dimensions": "100x200",
//             "name": "100 person interview room",
//             "defaultElements": []
//         }, {
//             headers: {
//                 authorization: `Bearer ${usertoken}`
//             }
//         })

//         const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//             "name": "Timmy"
//         }, {
//             headers: {
//                 authorization: `Bearer ${usertoken}`
//             }
//         })

//         const spaceresponse = await axios.post(`${BACKEND_URL}/api/v1/space`, {
//             "name": "Test",
//             "dimensions": "100x200",
//             "mapId": mapId
//         }, {
//             headers: {
//                 authorization: `Bearer ${usertoken}`
//             }
//         })

//         expect(updateelementresponse.statusCode).toBe(400)
//         expect(elementresponse.statusCode).toBe(400)
//         expect(avatarResponse.statusCode).toBe(400)
//         expect(mapResponse.statusCode).toBe(400)
//         expect(spaceresponse.statusCode).toBe(400)
//     })

//     test("user is able to hit admin endpoint", async () => {
//         const elementresponse = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//             "width": 1,
//             "height": 1,
//             "static": true // weather or not the user can sit on top of this element (is it considered as a collission or not)
//         }, {
//             headers: {
//                 authorization: `Bearer ${usertoken}`
//             }
//         })

//         const updateelementresponse = await axios.put(`${BACKEND_URL}/api/v1/admin/element/123`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE"
//         }, {
//             headers: {
//                 authorization: `Bearer ${admintoken}`
//             }
//         })

//         const mapResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/map`, {
//             "thumbnail": "https://thumbnail.com/a.png",
//             "dimensions": "100x200",
//             "name": "100 person interview room",
//             "defaultElements": []
//         }, {
//             headers: {
//                 authorization: `Bearer ${admintoken}`
//             }
//         })

//         const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//             "name": "Timmy"
//         }, {
//             headers: {
//                 authorization: `Bearer ${admintoken}`
//             }
//         })

//         expect(updateelementresponse.statusCode).toBe(200)
//         expect(elementresponse.statusCode).toBe(200)
//         expect(avatarResponse.statusCode).toBe(200)
//         expect(mapResponse.statusCode).toBe(200)
//     })

//     test("admin is able to update the imageurl for an element", async () => {
//         const createElementResponse = await axios.post(`${BACKEND_URL}api/v1/admin/element`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//             "width": 1,
//             "height": 1,
//             "static": true // weather or not the user can sit on top of this element (is it considered as a collission or not)
//         }, {
//             headers: {
//                 authorization: `Bearer ${admintoken}`
//             }
//         })

//         const upadateElementresponse = await axios.post(`${BACKEND_URL}api/v1/admin/element/${createElementResponse.data.id}`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE"
//         }, {
//             headers: {
//                 authorization: `Bearer ${admintoken}`
//             }
//         })

//         expect(upadateElementresponse.statusCode).toBe(200)
//     })
// })

// describe("websocket tests", () => {
//     let adminuserId;
//     let userID;
//     let usertoken;
//     let admintoken;
//     let spaceId;
//     let adminId;
//     let elements1Id;
//     let elements2Id;
//     let mapId;
//     let ws1;
//     let ws2;
//     let ws1Messages = [];
//     let ws2Messages = [];
//     let userX;
//     let userY;
//     let adminX;
//     let adminY;

//     function waitforandPoplatestMessage(messageArray) {
//         return new Promise(r => {
//             if (messageArray.length > 0) {
//                 r(messageArray.shift())
//             } else {
//                 let interval = setInterval(() => {
//                     if (messageArray.length > 0) {
//                         r(messageArray.shift())
//                         clearInterval(interval)
//                     }
//                 }, 100);
//             }
//         })
//     }

//     async function setuphttps() {
//         const username = `akash-${math.random()}`;
//         const password = `password123`
//         const adminsignupresponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username,
//             password
//         })

//         const adminsigninresponse = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//             username,
//             password
//         })

//         adminuserId = adminsignupresponse.data.userId;
//         admintoken = adminsigninresponse.data.token;

//         const usersignupresponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username,
//             password
//         })

//         const usersigninresponse = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//             username,
//             password
//         })

//         userID = usersignupresponse.data.userid;
//         usertoken = usersigninresponse.data.token;

//         const element1 = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//             "width": 1,
//             "height": 1,
//             "static": true // weather or not the user can sit on top of this element (is it considered as a collission or not)
//         }, {
//             headers: {
//                 authorization: `Bearer ${admintoken}`
//             }
//         })
//         const element2 = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//             "width": 1,
//             "height": 1,
//             "static": true // weather or not the user can sit on top of this element (is it considered as a collission or not)
//         }, {
//             headers: {
//                 authorization: `Bearer ${admintoken}`
//             }
//         })
//         elements1Id = element1.id // element1.data.id
//         elements1Id = element2.id // element1.data.id

//         const mapResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/map`, {
//             "thumbnail": "https://thumbnail.com/a.png",
//             "dimensions": "100x200",
//             "name": "100 person interview room",
//             "defaultElements": [{
//                 elementId: elements1Id,
//                 x: 20,
//                 y: 20
//             }, {
//                 elementId: elements1Id,
//                 x: 18,
//                 y: 20
//             }, {
//                 elementId: elements2Id,
//                 x: 19,
//                 y: 20
//             }]
//         }, {
//             headers: {
//                 authorization: `Bearer ${admintoken}`
//             }
//         })
//         mapId = mapResponse.data.id

//         const spaceresponse = await axios.post(`${BACKEND_URL}/api/v1/space`, {
//             "name": "Test",
//             "dimensions": "100x200",
//             "mapId": mapId
//         }, {
//             headers: {
//                 authorization: `Bearer ${admintoken}`
//             }
//         })
//         spaceId = spaceresponse.data.spaceID
//     }

//     async function setupws() {
//         ws1 = new WebSocket(WS_URL);
//         ws2 = new WebSocket(WS_URL);

//         await new Promise(r => {
//             ws1.onopen = r
//         })

//         await new Promise(r => {
//             ws2.onopen = r
//         })

//         ws1.onmessage = (event) => {
//             ws1Messages.push(JSON.parse(event.data))
//         }

//         ws2.onmessage = (event) => {
//             ws2Messages.push(JSON.parse(event.data))
//         }
//     }

//     beforeAll(async () => {
//         setuphttps()
//         setupws()
//     })

//     test("get back ack for joining the space", () => {
//         ws1.send(JSON.stringify({
//             "type": "join",
//             "payload": {
//                 "spaceId": spaceId,
//                 "token": admintoken
//             }
//         }))

//         ws1.send(JSON.stringify({
//             "type": "join",
//             "payload": {
//                 "spaceId": spaceId,
//                 "token": usertoken
//             }
//         }))

//         const message1 = waitforandPoplatestMessage(ws1Messages)
//         const message2 = waitforandPoplatestMessage(ws2Messages)
//         const message3 = waitforandPoplatestMessage(ws2Messages)

//         expect(message1.type).toBe("space-joined")
//         expect(message2.type).toBe("space-joined")

//         expect(message1.payload.users.length).toBe(0)
//         expect(message2.payload.users.length).toBe(1)
//         expect(message3.type).toBe("user-join")

//         adminX = message1.payload.spawn.x
//         adminY = message1.payload.spawn.y

//         userX = message2.payload.spawn.x
//         userY = message2.payload.spawn.y
//     })

//     test("user should not be able to move across the boundary of the wall", async () => {
//         ws1.send(JSON.stringify({
//             "type": "movement",
//             "payload": {
//                 "x": 1000000,
//                 "y": 200000,
//             }
//         }))

//         const message = await waitforandPoplatestMessage(ws1Messages)
//         expect(message.type).toBe("movement-rejected");
//     })
    
//     test("user should not be able to move two block at the same time", async () => {
//         ws1.send(JSON.stringify({
//             "type": "movement",
//             "payload": {
//                 "x": adminX + 2,
//                 "y": adminY,
//             }
//         }))

//         const message = await waitforandPoplatestMessage(ws1Messages)
//         expect(message.type).toBe("movement-rejected");
//     })
    
//     test("correct movement should be broadcasted to the other socket in the room", async () => {
//         ws1.send(JSON.stringify({
//             "type": "movement",
//             "payload": {
//                 "x": adminX + 1,
//                 "y": adminY,
//                 userId: adminId
//             }
//         }))

//         const message = await waitforandPoplatestMessage(ws2Messages)
//         expect(message.type).toBe("movement");
//     })
    
//     test("if the user leaves, the other user receives a leave event ", async () => {
//         ws1.close()
//         const message = await waitforandPoplatestMessage(ws2Messages)
//         expect(message.type).toBe("user-left");
//     })
// }) 