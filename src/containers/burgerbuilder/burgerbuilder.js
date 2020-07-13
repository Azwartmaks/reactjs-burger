import React, { Component } from 'react';
import Auxx from "../../hoc/Auxx/Auxx";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};
class BurgerBuilder extends Component {
/*    constructor (props) {
        super(props)
        this.state =  {...}
    }*/
    componentDidMount() {
        axios.get('/ingredients.json')
                .then((response) => {
                    this.setState({ingredients: response.data});
                    console.log(response)
                })
                .catch((error) => {
                    this.setState({loader: false, purchasing: false});
                    console.log(error)
                });
    }

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        loader: false,
    };
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0})
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: (newPrice.toFixed(2) * 1),
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({
            totalPrice: (newPrice.toFixed(2) * 1),
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({purchasing: true})
    };
    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    };
    purchaseContinueHandler = () => {
        // alert('You Continue');
        this.setState({ loader: true, })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Max Kul',
                address: {
                    street: 'New street',
                    zipcode: '12321',
                    country: 'UA'
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'fastest',
        };

        axios.post('/order.json', order)
            .then((response) => {
                this.setState({loader: false, purchasing: false});
                console.log(response)
            })
            .catch((error) => {
                this.setState({loader: false, purchasing: false});
                console.log(error)
            });
    };

    render () {
        let orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                totalPrice={this.state.totalPrice}
        />;
        if (this.state.loader) {
            orderSummary = <Spinner />
        }

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Auxx>
                <Modal show={this.state.purchasing} cancel={this.purchaseCancelHandler} loader={this.state.loader}>
                    {orderSummary}
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    price={this.state.totalPrice}
                    purchasable = {this.state.purchasable}
                    ordered = {this.purchaseHandler}
                />
            </Auxx>
        );
    }
}
export default withErrorHandler(BurgerBuilder)
